<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>JC</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="./assets/favicon.ico" rel="icon" type="image/x-icon">
    <?php
        $isProd = $_SERVER["SERVER_NAME"] === "jacobconnors.com";
        $isProd = false; // testing w/ dev builds
        $js_default = [
            "production" => [
                "./dist/js/react.production.min.js",
                "./dist/js/react-dom.production.min.js"
            ],
            "development" => [
                "./dist/js/react.development.js",
                "./dist/js/react-dom.development.js"
            ]
        ];
        $css_default = [
            "./dist/css/bootstrap.min.css",
            "./dist/css/fontawesome/css/all.min.css"
        ];
        $js_paths = $isProd ? $js_default["production"] : $js_default["development"];
        foreach ($js_paths as $src_path) {
            echo '<script src="' . $src_path . '"></script>';
        }
        foreach ($css_default as $href_link) {
            echo '<link href="' . $href_link . '" rel="stylesheet">' . "\n";
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
    <div id="navbar-popper">
        <!-- used by popper elements -->
    </div>
</body>
</html>