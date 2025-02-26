param(
    [Parameter(Mandatory=$true)]  # Force this argument to be required
    [string]$model = ""                
)

while ($true) {
    Write-Host "Attempting to download model..."
    $process = Start-Process -FilePath "ollama" -ArgumentList "pull $model" -PassThru -NoNewWindow
    
    try {
        $process | Wait-Process -Timeout 15 -ErrorAction Stop
        
        if ($process.ExitCode -eq 0) {
            Write-Host "Model downloaded successfully!"
            break 
        }
        else {
            Write-Host "Download failed (Exit code: $($process.ExitCode)). Retrying..."
        }
    }
    catch {
        Write-Host "Timeout occurred, restarting download..."
        $process | Stop-Process -Force -ErrorAction SilentlyContinue
    }
    
    Start-Sleep -Seconds 2
}