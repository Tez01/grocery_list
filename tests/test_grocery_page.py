import os
import pathlib
import unittest

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


def file_uri(filename):
    return pathlib.Path(os.path.abspath(filename))


driver = webdriver.Chrome(ChromeDriverManager().install())
