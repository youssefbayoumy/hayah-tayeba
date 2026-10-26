"""Stable entry point for packaging the current preview revision."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('package-maiyya.py')),run_name='__main__')
