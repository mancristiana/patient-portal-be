define({ "api": [
  {
    "type": "post",
    "url": "api/appointments/:id",
    "title": "Book Appointment",
    "name": "book_appointment",
    "group": "Appointments",
    "version": "1.0.0",
    "description": "<p>This request books an appointment from the available timeslots for the authenticated patient. The appointment details such as time, address and doctor are preset. To read more about getting all available timeslots, see: <a href=\"#api-Doctors-get_doctor_timeslots\">Get Doctor Timeslots</a></p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique id of a free timeslot listed under a selected doctor. To read more about getting all available timeslots, see: <a href=\"#api-Doctors-get_doctor_timeslots\">Get Doctor Timeslots</a></p>"
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
            "field": "401",
            "description": "<p>Unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Appointment not found</p>"
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Appointments"
  },
  {
    "type": "delete",
    "url": "api/appointments/:id",
    "title": "Cancel Appointment",
    "name": "cancel_appointment",
    "group": "Appointments",
    "version": "1.0.0",
    "description": "<p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Appointments"
  },
  {
    "type": "get",
    "url": "api/appointments",
    "title": "Get All Appointments",
    "name": "get_all_appointment",
    "group": "Appointments",
    "version": "1.0.0",
    "description": "<p>This endpoint allows an authenticated patient to see all of their own appointments.</p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Appointments"
  },
  {
    "type": "get",
    "url": "api/appointments/:id",
    "title": "Get Appointment By Id",
    "name": "get_appointment_by_id",
    "group": "Appointments",
    "version": "1.0.0",
    "description": "<p>This endpoint allows an authenticated patient to select and view a single appointment from their own list of appointments.</p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Appointments"
  },
  {
    "type": "put",
    "url": "api/appointments/:id",
    "title": "Update Appointment",
    "name": "update_appointment",
    "group": "Appointments",
    "version": "1.0.0",
    "description": "<p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Appointments"
  },
  {
    "type": "post",
    "url": "auth",
    "title": "Login",
    "name": "login",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>This endpoint validates user credentials and provides a signed <code>Json Web Token.</code></p> <p>This token can be sent in <code>Authorization</code> header of future requests to gain access to protected resources such as user profile and appointments.</p> <p>The API uses the Bearer authentication scheme meaning headers of protected resources must include <code>Authorization: Bearer token</code></p>",
    "parameter": {
      "examples": [
        {
          "title": "Request body",
          "content": "{\n    \"email\": \"test@test.com\",\n    \"password\": \"qwer1234\",\n}",
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
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": {\n        \"jwt\": \"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTE3MDRhYzVlNDM2MDE2ODBkMzgxZCIsImlhdCI6MTUyNzk1ODUwMiwiZXhwIjoxNTI3OTYyMTAyfQ.V9ch6KWmJ8f65qEeD7qPeSUm2z1mjPRm-HsO0WQq-eNCR1fBz_ej4UgVCYfJJ_yXDeq0Wmytwy1TYZcBNdn-LA\"\n    }\n}",
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
            "field": "400",
            "description": "<p>Bad request. Email and password must be specified</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Incorrect credentials</p>"
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
    "filename": "src/controllers/auth-controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "api/doctor/:id",
    "title": "Get Doctor by Id",
    "name": "get_doctor_by_id",
    "group": "Doctors",
    "version": "1.0.0",
    "description": "<p>This endpoint returns the doctors with the specified unique id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor's unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": {\n       \"_id\": \"5b1294ec3924ee271838b530\",\n       \"name\": \"John Doe\",\n       \"speciality\": {\n           \"_id\": \"5afec038c10c3f372c71cdf3\",\n           \"name\": \"Allergists\"\n       },\n       \"clinic\": \"Lege\",\n       \"address\": \"Stranden 89, 0250 Oslo Norway\",\n       \"phone\": \"94161140\"\n   }\n}",
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
            "field": "404",
            "description": "<p>Doctor was not found.</p>"
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
    "filename": "src/controllers/doctors-controller.js",
    "groupTitle": "Doctors"
  },
  {
    "type": "get",
    "url": "api/doctor/:id/timeslots",
    "title": "Get Doctor Timeslots",
    "name": "get_doctor_timeslots",
    "group": "Doctors",
    "version": "1.0.0",
    "description": "<p>This endpoint returns the available timeslots of doctors with the specified unique id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor's unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": [\n        {\n            \"_id\": \"5b1281723924ee271838b4ce\",\n            \"doctor\": \"5afde7ec734d1d7d453ec63c\",\n            \"time\": \"03-06-2018 10:00\",\n            \"duration\": 30,\n            \"patient\": null,\n            \"description\": \"\"\n        },\n        {\n            \"_id\": \"5b1281723924ee271838b4cf\",\n            \"doctor\": \"5afde7ec734d1d7d453ec63c\",\n            \"time\": \"03-06-2018 10:30\",\n            \"duration\": 30,\n            \"patient\": null,\n            \"description\": \"\"\n        }\n    ]\n}",
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
            "field": "404",
            "description": "<p>Doctor was not found.</p>"
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
    "filename": "src/controllers/appointments-controller.js",
    "groupTitle": "Doctors"
  },
  {
    "type": "get",
    "url": "api/doctors",
    "title": "Search Doctors",
    "name": "search_doctors",
    "group": "Doctors",
    "version": "1.0.0",
    "description": "<p>This endpoint returns a list of doctors satisfying the search filters and queries specified in the request.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "query",
            "description": "<p>Doctor's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City or any part of the address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "speciality",
            "description": "<p>Doctor's speciality</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": [\n       {\n           \"_id\": \"5b1294ec3924ee271838b530\",\n           \"name\": \"John Doe\",\n           \"speciality\": {\n               \"_id\": \"5afec038c10c3f372c71cdf3\",\n               \"name\": \"Allergists\"\n           },\n           \"clinic\": \"Lege\",\n           \"address\": \"Stranden 89, 0250 Oslo Norway\",\n           \"phone\": \"94161140\"\n       }\n   ]\n}",
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
            "field": "404",
            "description": "<p>No doctors were found. Please adjust your search query.</p>"
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
    "filename": "src/controllers/doctors-controller.js",
    "groupTitle": "Doctors"
  },
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
    "type": "put",
    "url": "api/users",
    "title": "Delete User",
    "name": "delete_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>An authorized user can delete their own user account. This request retrieves the user id from the authorization header and deletes the corresponding user.</p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "description": "<p>An authorized user can view their own user information. This request retrieves the user id from the authorization header and returns the corresponding user data.</p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
    "description": "<p>An authorized user can modify their own user profile. This request retrieves the user id from the authorization header and modifies the corresponding user data.</p> <p>This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.</p>",
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
