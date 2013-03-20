<!DOCTYPE html>
<html>
<head>
    <title>IBAN Calculator</title>
    <% String property = System.getProperty("env"); %>
    <% if (property != null && property.equals("development")) { %>
    <script type="text/javascript" data-main="js/main" src="js/vendor/require.js"></script>
    <% } else { %>
    <script type="text/javascript" src="build/reservasjoner.js?v=${buildNumber}"></script>
    <% } %>
</head>
<body >
    <div class="iban"></div>
</body>
</html>

