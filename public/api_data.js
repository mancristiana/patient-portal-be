define({ "api": [
  {
    "type": "get",
    "url": "api/specialities",
    "title": "Get All Specialities",
    "name": "get_all_specialities",
    "group": "Specialities",
    "version": "1.0.0",
    "description": "<p>This request returns a list of all Specialities.</p>",
    "success": {
      "fields": {
        "Speciality Fields": [
          {
            "group": "Speciality Fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the Speciality.</p>"
          },
          {
            "group": "Speciality Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>id of the Speciality.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n      {\n          \"id\": \"5afec038c10c3f372c71cdf2\",\n          \"name\": \"Acupuncturists\"\n      },\n      {\n          \"id\": \"5afec038c10c3f372c71cdf3\",\n          \"name\": \"Allergists\"\n      },\n      {\n          \"id\": \"5afec038c10c3f372c71cdf4\",\n          \"name\": \"Audiologists\"\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/specialities-controller.js",
    "groupTitle": "Specialities"
  },
  {
    "type": "delete",
    "url": "api/users",
    "title": "Delete User",
    "name": "delete_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>An authorized user can delete their own user account. This request retrieves the user id from the authorization header and deletes the corresponding user.</p>",
    "header": {
      "fields": {
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>User was successfully deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User was not found</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/users-controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "api/users",
    "title": "Get User",
    "name": "get_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>An authorized user can view their own user information. This request retrieves the user id from the authorization header and returns the corresponding user data.</p>",
    "header": {
      "fields": {
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": {\n        \"name\": \"Cristiana Madnddn\",\n        \"email\": \"test@test.com\",\n        \"nationalId\": \"12037671531\",\n        \"phone\": \"35001230\",\n        \"address\": \"Terminalgade 2, 2770 Kastrup\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User was not found</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/users-controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "api/users",
    "title": "Register User",
    "name": "register_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This request creates a new user on the patient platform. By default the new user is assigned the patient role and all it's corresponding privileges.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique Email used for logging into the account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password used for logging into the account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nationalId",
            "description": "<p>Unique Norwegian national id number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Unique Norwegian phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body",
          "content": "{\n    \"email\": \"test@test.com\",\n    \"password\": \"qwer1234\",\n    \"name\": \"Test 4\",\n    \"nationalId\": \"12037671637\",\n    \"phone\": \"35001237\",\n    \"address\": \"Terminalgade 2, 2770 Kastrup\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>User was successfully created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>Conflict</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "(Error 4xx) 409 Conflict",
          "content": "{\n    \"success\": false,\n    \"error\": \"Conflict registering new user. User email, phone and national Id must be unique\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/users-controller.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "api/users",
    "title": "Update User Profile",
    "name": "update_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>An authorized user can modify their own user profile. This request retrieves the user id from the authorization header and modifies the corresponding user data.</p>",
    "header": {
      "fields": {
        "Authorization Header": [
          {
            "group": "Authorization Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Update account",
          "content": "{\n    \"email\": \"test@test.com\",\n    \"password\": \"qwer1234\",\n}",
          "type": "json"
        },
        {
          "title": "Update profile",
          "content": "{\n    \"name\": \"Test 4\",\n    \"nationalId\": \"12037671637\",\n    \"phone\": \"35001237\",\n    \"address\": \"Terminalgade 2, 2770 Kastrup\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>User was successfully updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User was not found</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/users-controller.js",
    "groupTitle": "Users"
  }
] });
