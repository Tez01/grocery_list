from django.test import TestCase, Client
from .models import ListItems
from django.contrib.auth.models import User
import json
from http import HTTPStatus
# Create your tests here.


class ApiTestCase(TestCase):
    # Initial setup.
    def setUp(self):

        # Create a user
        user1 = User.objects.create_user(username="bar", password="foo")
        user2 = User.objects.create_user(username="jazz", password="pascal")
        # Create some random list items
        item1 = ListItems.objects.create(
            id="4242343235", user=user1, purchased=False, text="Apples")
        item2 = ListItems.objects.create(
            id="424235", user=user1, purchased=True, text="Mangoes")

    def testUnauthenticatedAccess(self):
        """Test if unauthenticated user is denied access to api page"""
        c = Client()
        response = c.get("/api/")
        self.assertEqual(response.status_code, 403)

    def testAuthenticatedAccess(self):
        """Test if authenticated user is permitted access to api page"""
        # Create a user
        user = User.objects.create_user(username="foo")
        user.set_password('bar')
        user.save()

        c = Client()
        logged_in = c.login(username='foo', password='bar')
        response = c.get("/api/")
        self.assertEqual(response.status_code, 200)

    def testUniqueItemId(self):
        """Test items have unique id"""
        items = list(ListItems.objects.all())
        self.assertNotEqual(items[0].id,  items[1].id)

    def testValidPostRequest(self):
        "Test if a valid post request returns code 200"
        # Create a user
        user = User.objects.create_user(username="foo")
        user.set_password('bar')
        user.save()
        # Create a client
        c = Client()
        logged_in = c.login(username='foo', password='bar')
        # Create sample data
        data = {'id': 123, 'text': "Apples", 'purchased': False}
        jsonData = json.dumps(data)
        # Make a post request by passing data as form
        response = c.post('/api/', data=jsonData,
                          content_type='application/x-www-form-urlencoded')

        self.assertEqual(response.status_code, HTTPStatus.CREATED)

    def testInvalidPostRequest(self):
        "Test if an invalid post request returns code 400"
        # Create a user
        user = User.objects.create_user(username="foo")
        user.set_password('bar')
        user.save()
        # Create a client
        c = Client()
        logged_in = c.login(username='foo', password='bar')
        # Create sample data, intentionally remove purchased field
        data = {'id': 123, 'text': "Apples"}
        jsonData = json.dumps(data)
        # Make a post request by passing data as form
        response = c.post('/api/', data=jsonData,
                          content_type='application/x-www-form-urlencoded')

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
