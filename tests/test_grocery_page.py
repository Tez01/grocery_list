import os
import pathlib
import unittest

from selenium import webdriver


def file_uri(filename):
    return pathlib.Path(os.path.abspath('../frontend/templates/frontend/index.html'))


driver = webdriver.Chrome()
