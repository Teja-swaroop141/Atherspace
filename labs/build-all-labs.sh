#!/bin/bash

# ========================================
# ZeroSetup Labs - Docker Build Script
# ========================================
# This script builds all lab Docker images with the correct names
# used by the backend API (main.py)

echo "🚀 Starting to build all lab Docker images..."
echo ""

# Get the labs directory
LABS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Track build results
SUCCESS_COUNT=0
FAIL_COUNT=0
declare -a RESULTS

# ========================================
# 1. CN Lab (Computer Networks)
# ========================================
echo "📡 Building CN Lab..."
cd "$LABS_DIR/cn"
if docker build -t zero-cn-lab:latest .; then
    echo "✅ CN Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-cn-lab:latest")
else
    echo "❌ CN Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-cn-lab:latest")
fi
echo ""

# ========================================
# 2. Cyber Security Lab
# ========================================
echo "🔐 Building Cyber Security Lab..."
cd "$LABS_DIR/cyber"
if docker build -t zero-cyber-lab:latest .; then
    echo "✅ Cyber Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-cyber-lab:latest")
else
    echo "❌ Cyber Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-cyber-lab:latest")
fi
echo ""

# ========================================
# 3. SQL Lab
# ========================================
echo "🗄️ Building SQL Lab..."
cd "$LABS_DIR/sql"
if docker build -t zero-sql-lab:latest .; then
    echo "✅ SQL Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-sql-lab:latest")
else
    echo "❌ SQL Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-sql-lab:latest")
fi
echo ""

# ========================================
# 4. Web Development Lab (MERN)
# ========================================
echo "🌐 Building Web Development Lab..."
cd "$LABS_DIR/web"
if docker build -t zero-web-lab:latest .; then
    echo "✅ Web Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-web-lab:latest")
else
    echo "❌ Web Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-web-lab:latest")
fi
echo ""

# ========================================
# 5. Python Lab
# ========================================
echo "🐍 Building Python Lab..."
cd "$LABS_DIR/python"
if docker build -t zero-simpleputhon-lab:latest .; then
    echo "✅ Python Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-simpleputhon-lab:latest")
else
    echo "❌ Python Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-simpleputhon-lab:latest")
fi
echo ""

# ========================================
# 6. Data Science Lab (AI/ML)
# ========================================
echo "📊 Building Data Science Lab..."
cd "$LABS_DIR/Data Science"
if docker build -t zero-python-lab:latest .; then
    echo "✅ Data Science Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-python-lab:latest")
else
    echo "❌ Data Science Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-python-lab:latest")
fi
echo ""

# ========================================
# 7. IoT Lab
# ========================================
echo "🤖 Building IoT Lab..."
cd "$LABS_DIR/iot"
if docker build -t zero-iot-lab:latest .; then
    echo "✅ IoT Lab built successfully"
    ((SUCCESS_COUNT++))
    RESULTS+=("✅ zero-iot-lab:latest")
else
    echo "❌ IoT Lab build failed"
    ((FAIL_COUNT++))
    RESULTS+=("❌ zero-iot-lab:latest")
fi
echo ""

# ========================================
# Build Summary
# ========================================
echo "========================================"
echo "BUILD SUMMARY"
echo "========================================"
echo ""

for result in "${RESULTS[@]}"; do
    echo "$result"
done

echo ""
echo "Total: $((SUCCESS_COUNT + FAIL_COUNT)) labs"
echo "✅ Success: $SUCCESS_COUNT"
echo "❌ Failed: $FAIL_COUNT"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo "🎉 All labs built successfully!"
else
    echo "⚠️ Some labs failed to build. Please check the errors above."
fi

# Return to original directory
cd "$LABS_DIR"
