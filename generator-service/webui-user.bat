@echo off

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--skip-torch-cuda-test --xformers --opt-split-attention --autolaunch --enable-insecure-extension-access --api

call webui.bat
