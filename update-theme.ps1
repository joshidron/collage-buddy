# PowerShell script to add theme-manager.js to all HTML files
# and remove duplicate theme toggle code

$htmlFiles = @(
    "about.html",
    "celendar.html", 
    "coding-practice.html",
    "course_details.html",
    "interview.html",
    "onboarding.html",
    "resources.html",
    "system-design.html",
    "todo.html",
    "2nd.html"
)

foreach ($file in $htmlFiles) {
    $filePath = "d:\CollageBuddy-main\$file"
    
    if (Test-Path $filePath) {
        Write-Host "Processing $file..." -ForegroundColor Cyan
        
        $content = Get-Content $filePath -Raw
        
        # Check if theme-manager.js is already included
        if ($content -notmatch "theme-manager\.js") {
            # Add theme-manager.js before </body> tag
            $content = $content -replace '</body>', "  <!-- Theme Manager -->`n  <script src=`"js/theme-manager.js`"></script>`n</body>"
            
            # Remove old theme toggle code if it exists
            $content = $content -replace '(?s)// Theme Toggle Logic.*?(?=\s*</script>)', '    // Theme management is now handled by theme-manager.js'
            
            Set-Content -Path $filePath -Value $content -NoNewline
            Write-Host "  ✓ Updated $file" -ForegroundColor Green
        } else {
            Write-Host "  - $file already has theme-manager.js" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ✗ $file not found" -ForegroundColor Red
    }
}

Write-Host "`nDone! All files have been updated." -ForegroundColor Green
