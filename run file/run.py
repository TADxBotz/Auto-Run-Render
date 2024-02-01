import json
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
import time

def get_links_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching links from {url}: {e}")
        return None

def open_all_links_in_browser(links, duration):
    # Set up Firefox options for headless mode
    options = Options()
    options.headless = False  # Set to True if you want to run headlessly

    # Create a new instance of the Firefox WebDriver
    driver = webdriver.Firefox(options=options)

    # Open each link in a new tab
    for index, link in enumerate(links):
        if index > 0:
            # Open a new tab
            driver.execute_script("window.open('');")
        
        # Switch to the new tab
        driver.switch_to.window(driver.window_handles[index])

        # Open the specified link in the browser
        driver.get(link)

    # Print the countdown timer for each tab
    for remaining_time in range(duration, 0, -1):
        minutes, seconds = divmod(remaining_time, 60)
        print(f"\rTime remaining: {minutes:02d}:{seconds:02d}", end='')
        time.sleep(1)

    # Close all tabs
    driver.quit()

if __name__ == "__main__":
    # URL for fetching links
    links_url = 'http://127.0.0.1/autorunlinks/links.json'
    
    # Read links from the JSON file
    links_to_open = get_links_from_url(links_url)

    if links_to_open is not None:
        duration_in_seconds = 30
        interval_in_minutes = 15

        while True:
            print("Executing script...")
            open_all_links_in_browser(links_to_open, duration_in_seconds)
            print(f"\nWaiting for {interval_in_minutes} minutes before the next run...")
            for remaining_time in range(interval_in_minutes * 60, 0, -1):
                minutes, seconds = divmod(remaining_time, 60)
                print(f"Time until next run: {minutes:02d}:{seconds:02d}", end='\r')
                time.sleep(1)
