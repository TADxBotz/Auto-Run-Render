<?php
header('Content-Type: application/json');

$jsonFile = 'links.json';

// Read existing links from the JSON file
$existingLinks = json_decode(file_get_contents($jsonFile), true);

// Get the new link from the POST request
$newLink = json_decode(file_get_contents('php://input'), true)['link'];

// Append the new link to the existing links
$existingLinks[] = $newLink;

// Save the updated links back to the JSON file
file_put_contents($jsonFile, json_encode($existingLinks, JSON_PRETTY_PRINT));

// Return the updated links as a response
echo json_encode($existingLinks);
?>
