<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>JC</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="icon" href="./public/favicon.ico">
    <?php
        $isProd = false; // testing prod. Use $_SERVER once dev server is set up
        $js_default = [
            "production" => [
                "./js/react.production.min.js",
                "./js/react-dom.production.min.js"
            ],
            "development" => [
                "./js/react.development.js",
                "./js/react-dom.development.js"
            ]
        ];
        $script_paths = $isProd ? $js_default["production"] : $js_default["development"];
        foreach ($script_paths as $path) {
            echo '<script src="' . $path . '"></script>';
        }
    ?>
</head>
<body>
    <div id="root" style="min-height:200px;">
        <!-- react will fill in the HTML -->
    </div>
    <div id="portal">
        <!-- used by popper elements -->
    </div>
</body>
</html>