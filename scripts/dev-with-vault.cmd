@echo off
setlocal

cd /d "%USERPROFILE%\Documents\Singclaw\singclaw-dynamic"
set "VAULT_ENV=C:\openclaw-workspace\vault\shared-secrets.env"
if "%~1"=="--env" (
  if "%~2"=="" (
    echo [singclaw-vault] missing value for --env
    exit /b 2
  )
  set "VAULT_ENV=%~2"
)

powershell -NoProfile -ExecutionPolicy Bypass -File "C:\openclaw-workspace\vault\run-with-vault.ps1" -VaultEnv "%VAULT_ENV%" -CommandLine "npm run dev"
exit /b %ERRORLEVEL%
