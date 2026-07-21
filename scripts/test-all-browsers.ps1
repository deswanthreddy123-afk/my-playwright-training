# PowerShell script to test on all browsers
# Usage: .\scripts\test-all-browsers.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cross-Browser Test Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$browsers = @('chromium', 'chrome', 'firefox', 'edge', 'webkit')
$results = @{}

foreach ($browser in $browsers) {
  Write-Host "Testing on $browser..." -ForegroundColor Yellow
  Write-Host "----------------------------------------"

  $env:BROWSER = $browser
  $env:HEADLESS = 'true'

  try {
    npm test 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
      $results[$browser] = "✅ PASSED"
      Write-Host "✅ $browser tests PASSED" -ForegroundColor Green
    }
    else {
      $results[$browser] = "❌ FAILED"
      Write-Host "❌ $browser tests FAILED" -ForegroundColor Red
    }
  }
  catch {
    $results[$browser] = "❌ ERROR"
    Write-Host "❌ $browser tests ERROR: $_" -ForegroundColor Red
  }

  Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Results Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

foreach ($browser in $browsers) {
  $status = $results[$browser]
  if ($status -like "*PASSED*") {
    Write-Host "$browser : $status" -ForegroundColor Green
  }
  else {
    Write-Host "$browser : $status" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "Test suite completed!" -ForegroundColor Cyan
