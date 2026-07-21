#!/bin/bash
# Bash script to test on all browsers
# Usage: ./scripts/test-all-browsers.sh

echo "========================================"
echo "Cross-Browser Test Suite"
echo "========================================"
echo ""

browsers=("chromium" "chrome" "firefox" "edge" "webkit")
declare -A results

for browser in "${browsers[@]}"; do
    echo "Testing on $browser..."
    echo "----------------------------------------"

    export BROWSER=$browser
    export HEADLESS=true

    if npm test > /dev/null 2>&1; then
        results[$browser]="✅ PASSED"
        echo "✅ $browser tests PASSED"
    else
        results[$browser]="❌ FAILED"
        echo "❌ $browser tests FAILED"
    fi

    echo ""
done

echo "========================================"
echo "Test Results Summary"
echo "========================================"

for browser in "${browsers[@]}"; do
    echo "$browser : ${results[$browser]}"
done

echo ""
echo "Test suite completed!"
