import os
import pathlib
import unittest
import random
import string
import time

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Make sure server is running before proceeding further
homeUrl = 'http://localhost:8000'  # This is the url that need to be tested


def file_uri(filename):
    return pathlib.Path(os.path.abspath(filename))


uri = file_uri("index.html")
print(uri)

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.maximize_window()
# Load the homepage in driver
driver.get(homeUrl)

# Get the username input html element using its id
usernameElement = driver.find_element(By.ID, "username")
# Get the password input html element using its id
passwordElement = driver.find_element(By.ID, "password")
# Get the login button html element using its id
loginElement = driver.find_element(By.ID, "login")

# Pass the username and password for a test user
usernameElement.send_keys("user1")
passwordElement.send_keys("passwordOfUser")

# Click the login button
loginElement.click()

# Find the input box to add new items using its class
addItemInput = driver.find_element(By.CLASS_NAME, "utilities__form__input")


# Find the add button to add new items
addItemButton = driver.find_element(By.CLASS_NAME, "utilities__form__button")


# Add 10 random items
for i in range(10):
    # Random text
    randomText = "".join(
        [random.choice(string.ascii_letters[:26]) for i in range(15)])
    # [https://stackoverflow.com/questions/367586/generating-random-text-strings-of-a-given-pattern]

    # Add this random text in input field
    addItemInput.send_keys(randomText)
    time.sleep(.3)
    # Click add button
    WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable(addItemButton)).click()

time.sleep(1)
# Delete all items except last few
# Find the delete button
list = driver.find_element(
    By.CLASS_NAME, "list")
listItems = list.find_elements(By.XPATH, "*")

for index, item in enumerate(listItems[:-5]):
    if index == 0:
        # Skip the last added item to see update made previously
        continue
    # Find the delete button of next item
    deleteButton = item.find_element(
        By.CLASS_NAME, "list__element__button--delete")
    # Click add button
    WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable(deleteButton)).click()


# Edit the last item
item = list.find_elements(By.XPATH, "*")
# Find update button of this item
editButton = item[0].find_element(
    By.CLASS_NAME, "list__element__button--edit")

# Click the button
WebDriverWait(driver, 20).until(
    EC.element_to_be_clickable(editButton)).click()


# Find the input text area
inputArea = driver.find_element(
    By.CLASS_NAME, "utilities__form__input--update")


inputArea.send_keys(" Apples")
# Find the update button
updateButton = driver.find_element(
    By.CLASS_NAME, "utilities__form__button--update")
# Click the button
WebDriverWait(driver, 20).until(
    EC.element_to_be_clickable(updateButton)).click()


# Find the updated list and list items
list = driver.find_element(
    By.CLASS_NAME, "list")
listItems = list.find_elements(By.XPATH, "*")
time.sleep(1)
# Make every other entry purchased
for index, item in enumerate(listItems):
    if (int(index % 2)) == 0:
        # Find the purchased button
        purchasedButton = item.find_element(
            By.CLASS_NAME, "list__element__button--purchased")
        # Click the purchase button
        WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable(purchasedButton)).click()


time.sleep(5)

# Delete all items
# Find the delete button
list = driver.find_element(
    By.CLASS_NAME, "list")
listItems = list.find_elements(By.XPATH, "*")

for index, item in enumerate(listItems):

    # Find the delete button of next item
    deleteButton = item.find_element(
        By.CLASS_NAME, "list__element__button--delete")
    # Click add button
    WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable(deleteButton)).click()

time.sleep(2)

# # Close the window
# driver.close()
