Add-Type -AssemblyName System.Drawing
$filePath = "c:\Users\abila\Desktop\CloudAxis_ENG_web\public\logo-full.png"
$src = [System.Drawing.Bitmap]::FromFile($filePath)
$minX = $src.Width
$minY = $src.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y += 2) {
    for ($x = 0; $x -lt $src.Width; $x += 2) {
        $p = $src.GetPixel($x, $y)
        # Check if non-white and non-transparent
        if ($p.A -gt 30 -and ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$pad = 12
$x0 = [Math]::Max(0, $minX - $pad)
$y0 = [Math]::Max(0, $minY - $pad)
$w = [Math]::Min($src.Width - $x0, ($maxX - $minX) + ($pad * 2))
$h = [Math]::Min($src.Height - $y0, ($maxY - $minY) + ($pad * 2))

$rect = New-Object System.Drawing.Rectangle($x0, $y0, $w, $h)
$cropped = $src.Clone($rect, $src.PixelFormat)
$src.Dispose()
$cropped.Save("c:\Users\abila\Desktop\CloudAxis_ENG_web\public\logo-cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
Write-Output "Cropped to: $w x $h"

# Also crop icon
$iconPath = "c:\Users\abila\Desktop\CloudAxis_ENG_web\public\logo-icon.png"
$srcIcon = [System.Drawing.Bitmap]::FromFile($iconPath)
$minX = $srcIcon.Width; $minY = $srcIcon.Height; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $srcIcon.Height; $y += 2) {
    for ($x = 0; $x -lt $srcIcon.Width; $x += 2) {
        $p = $srcIcon.GetPixel($x, $y)
        if ($p.A -gt 30 -and ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$x0 = [Math]::Max(0, $minX - $pad)
$y0 = [Math]::Max(0, $minY - $pad)
$w = [Math]::Min($srcIcon.Width - $x0, ($maxX - $minX) + ($pad * 2))
$h = [Math]::Min($srcIcon.Height - $y0, ($maxY - $minY) + ($pad * 2))
$rect = New-Object System.Drawing.Rectangle($x0, $y0, $w, $h)
$croppedIcon = $srcIcon.Clone($rect, $srcIcon.PixelFormat)
$srcIcon.Dispose()
$croppedIcon.Save("c:\Users\abila\Desktop\CloudAxis_ENG_web\public\logo-icon-cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)
$croppedIcon.Dispose()
Write-Output "Icon cropped to: $w x $h"
