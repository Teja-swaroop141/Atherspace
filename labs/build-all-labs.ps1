# ========================================
# ZeroSetup Labs - Docker Build Script
# ========================================
# This script builds all lab Docker images with the correct names
# used by the backend API (main.py)

Write-Host "🚀 Starting to build all lab Docker images..." -ForegroundColor Cyan
Write-Host ""

# Get the labs directory
$labsDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Track build results
$successCount = 0
$failCount = 0
$results = @()

# ========================================
# 1. CN Lab (Computer Networks)
# ========================================
Write-Host "📡 Building CN Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\cn"
docker build -t zero-cn-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ CN Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-cn-lab:latest"
} else {
    Write-Host "❌ CN Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-cn-lab:latest"
}
Write-Host ""

# ========================================
# 2. Cyber Security Lab
# ========================================
Write-Host "🔐 Building Cyber Security Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\cyber"
docker build -t zero-cyber-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cyber Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-cyber-lab:latest"
} else {
    Write-Host "❌ Cyber Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-cyber-lab:latest"
}
Write-Host ""

# ========================================
# 3. SQL Lab
# ========================================
Write-Host "🗄️ Building SQL Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\sql"
docker build -t zero-sql-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ SQL Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-sql-lab:latest"
} else {
    Write-Host "❌ SQL Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-sql-lab:latest"
}
Write-Host ""

# ========================================
# 4. Web Development Lab (MERN)
# ========================================
Write-Host "🌐 Building Web Development Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\web"
docker build -t zero-web-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Web Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-web-lab:latest"
} else {
    Write-Host "❌ Web Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-web-lab:latest"
}
Write-Host ""

# ========================================
# 5. Python Lab
# ========================================
Write-Host "🐍 Building Python Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\python"
docker build -t zero-simpleputhon-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Python Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-simpleputhon-lab:latest"
} else {
    Write-Host "❌ Python Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-simpleputhon-lab:latest"
}
Write-Host ""

# ========================================
# 6. Data Science Lab (AI/ML)
# ========================================
Write-Host "📊 Building Data Science Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\Data Science"
docker build -t zero-python-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Data Science Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-python-lab:latest"
} else {
    Write-Host "❌ Data Science Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-python-lab:latest"
}
Write-Host ""

# ========================================
# 7. IoT Lab
# ========================================
Write-Host "🤖 Building IoT Lab..." -ForegroundColor Yellow
Set-Location "$labsDir\iot"
docker build -t zero-iot-lab:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ IoT Lab built successfully" -ForegroundColor Green
    $successCount++
    $results += "✅ zero-iot-lab:latest"
} else {
    Write-Host "❌ IoT Lab build failed" -ForegroundColor Red
    $failCount++
    $results += "❌ zero-iot-lab:latest"
}
Write-Host ""

# ========================================
# Build Summary
# ========================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BUILD SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($result in $results) {
    Write-Host $result
}

Write-Host ""
Write-Host "Total: $($successCount + $failCount) labs" -ForegroundColor White
Write-Host "✅ Success: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "🎉 All labs built successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Some labs failed to build. Please check the errors above." -ForegroundColor Yellow
}

# Return to original directory
Set-Location $labsDir
