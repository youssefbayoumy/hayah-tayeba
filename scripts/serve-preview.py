"""Static demo server with HTTP byte ranges for accurate video seek/resume."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse, re

class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        target = Path(self.translate_path(self.path))
        value = self.headers.get('Range')
        if not value or not target.is_file():
            self.byte_range = None
            return super().send_head()
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', value)
        if not match:
            self.send_error(416)
            return None
        size = target.stat().st_size
        start = int(match[1] or max(0, size-int(match[2] or size)))
        end = min(size-1, int(match[2]) if match[1] and match[2] else size-1)
        if start > end or start >= size:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.end_headers()
            return None
        source = target.open('rb')
        source.seek(start)
        self.byte_range = (start, end)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(target)))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end-start+1))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        return source

    def copyfile(self, source, output):
        if not getattr(self, 'byte_range', None):
            return super().copyfile(source, output)
        remaining = self.byte_range[1]-self.byte_range[0]+1
        try:
            while remaining:
                chunk = source.read(min(65536, remaining))
                if not chunk:
                    break
                output.write(chunk)
                remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass  # Browser cancelled a seek; not a server fault.

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8761)
    parser.add_argument('--bind', default='127.0.0.1')
    args = parser.parse_args()
    directory = str(Path(__file__).resolve().parents[1]/'docs')
    def handler(*a, **kw):
        return Handler(*a, directory=directory, **kw)
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    print(f'Demo: http://{args.bind}:{args.port}/', flush=True)
    server.serve_forever()
