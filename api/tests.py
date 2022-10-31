from django.test import TestCase
from .models import ListItems
from django.contrib.auth.models import User
# Create your tests here.


class ApiTestCase(TestCase):
    # Initial setup.
    def setUp(self):

        # Create a user
        user1 = User.objects.create_user(username="foo", password="bar")
        user2 = User.objects.create_user(username="jazz", password="pascal")
        # Create some random list items
        item1 = ListItems.objects.create(
            id="4242343235", user=user1, purchased=False, text="Apples")
        item2 = ListItems.objects.create(
            id="424235", user=user1, purchased=True, text="Mangoes")

    def testUniqueItemId(self):
        """Test items have unique id"""
        items = list(ListItems.objects.all())
        self.assertNotEqual(items[0].id,  items[1].id)
