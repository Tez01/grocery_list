import os
import pathlib
import unittest
import random, string


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

# Make sure server is running before proceeding further
homeUrl = 'http://localhost:8000' # This is the url that need to be tested

def file_uri(filename):
    return pathlib.Path(os.path.abspath(filename))

uri = file_uri("index.html")
print(uri)

driver = webdriver.Chrome(ChromeDriverManager().install())

# Load the homepage in driver
driver.get(homeUrl)

# Get the username input html element using its id 
usernameElement= driver.find_element(By.ID, "username")
# Get the password input html element using its id 
passwordElement = driver.find_element(By.ID, "password")
# Get the login button html element using its id 
loginElement = driver.find_element(By.ID, "login")

#Pass the username and password for a test user
usernameElement.send_keys("user1")
passwordElement.send_keys("passwordOfUser")

#Click the login button
loginElement.click()

#Find the input box to add new items using its class
addItemInput = driver.find_element(By.CLASS_NAME, "utilities__form__input")



#Find the add button to add new items
addItemButton = driver.find_element(By.CLASS_NAME, "utilities__form__button")


# Add 100 random items
for i in range(2):
    #Random text
    randomText = "".join( [random.choice(string.ascii_letters[:26]) for i in range(15)] )
    #[https://stackoverflow.com/questions/367586/generating-random-text-strings-of-a-given-pattern]

    # Add this random text in input field
    addItemInput.send_keys(randomText)
    # Click add button
    addItemButton.click()
