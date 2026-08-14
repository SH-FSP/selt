import {
  apple,
  email,
  facebook,
  google,
  service01,
  service02,
  service03,
  serviceicon01,
  serviceicon02,
  serviceicon03,
  serviceicon04,
} from '../assets/images';

export const authMethods = [
  {
    id: 'google',
    label: 'Continue With Google',
    icon: google,
  },
  {
    id: 'apple',
    label: 'Continue With Apple Id',
    icon: apple,
  },
  {
    id: 'email',
    label: 'Login With Email',
    icon: email,
  },
  // {
  //   id: 'facebook',
  //   label: 'Continue With Facebook',
  //   icon: facebook,
  // },
];

export const services = [
  {
    id: 1,
    name: 'Roof Replacement',
    category: 'Service',
    description:
      'Complete removal and replacement of old or damaged roofing with high-quality, weather-resistant materials. Includes inspection, debris removal, and installation.',
    price: '$6,500.00',
    image: service01,
    icon: serviceicon01,
  },
  {
    id: 2,
    name: 'Gutter Cleaning',
    category: 'Service',
    description:
      'Thorough cleaning of roof gutters to remove debris, prevent clogs, and ensure proper water drainage. Includes inspection for leaks and damage.',
    price: '$150.00',
    image: service02,
    icon: serviceicon02,
  },
  {
    id: 3,
    name: 'Window Installation',
    category: 'Service',
    description:
      'Professional installation of energy-efficient windows, including measurement, removal of old units, sealing, and cleanup.',
    price: '$3,200.00',
    image: service03,
    icon: serviceicon03,
  },
  {
    id: 4,
    name: 'HVAC Maintenance',
    category: 'Service',
    description:
      'Routine maintenance of your heating and cooling system to improve performance, extend lifespan, and reduce energy costs.',
    price: '$220.00',
    image: service01,
    icon: serviceicon04,
  },
  {
    id: 5,
    name: 'Plumbing Checkup',
    category: 'Service',
    description:
      'Full-system inspection of plumbing pipes, fixtures, and water pressure to detect leaks, clogs, or wear-and-tear before costly issues arise.',
    price: '$180.00',
    image: service02,
    icon: serviceicon01,
  },
  {
    id: 6,
    name: 'Pest Control',
    category: 'Service',
    description:
      'Targeted pest control treatments to eliminate insects and rodents from your property. Safe for children and pets. Includes inspection and prevention tips.',
    price: '$250.00',
    image: service03,
    icon: serviceicon04,
  },
];




  export const reviewsNew = [
    {
      "id": 1,
      "description": "Great service, timely and efficient. Will book again!",
      "star": 5,
      "user_id": 101,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 201,
      "date": "2025-07-21",
      "active": 1,
      "created_at": "2025-07-21T10:00:00.000000Z",
      "updated_at": "2025-07-21T10:00:00.000000Z",
      "user": {
        "id": 101,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "phone": "1234567890",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=AJ",
        "device_token": "token_aj123",
        "email_verified_at": "2025-07-20T08:00:00.000000Z",
        "created_at": "2025-07-18T08:00:00.000000Z",
        "updated_at": "2025-07-21T10:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 2,
      "description": "Service was okay, not too fast but got the job done.",
      "star": 3,
      "user_id": 102,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 202,
      "date": "2025-07-22",
      "active": 1,
      "created_at": "2025-07-22T11:00:00.000000Z",
      "updated_at": "2025-07-22T11:00:00.000000Z",
      "user": {
        "id": 102,
        "name": "Bob Smith",
        "email": "bob@example.com",
        "phone": "9876543210",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=BS",
        "device_token": "token_bs456",
        "email_verified_at": "2025-07-21T07:00:00.000000Z",
        "created_at": "2025-07-19T07:00:00.000000Z",
        "updated_at": "2025-07-22T11:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 3,
      "description": "Amazing experience. Super friendly and professional.",
      "star": 5,
      "user_id": 103,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 203,
      "date": "2025-07-23",
      "active": 1,
      "created_at": "2025-07-23T12:00:00.000000Z",
      "updated_at": "2025-07-23T12:00:00.000000Z",
      "user": {
        "id": 103,
        "name": "Carla Gomez",
        "email": "carla@example.com",
        "phone": "5551234567",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=CG",
        "device_token": "token_cg789",
        "email_verified_at": "2025-07-22T06:00:00.000000Z",
        "created_at": "2025-07-20T06:00:00.000000Z",
        "updated_at": "2025-07-23T12:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 4,
      "description": "Not satisfied. Trash was left at my door.",
      "star": 2,
      "user_id": 104,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 204,
      "date": "2025-07-20",
      "active": 1,
      "created_at": "2025-07-20T09:00:00.000000Z",
      "updated_at": "2025-07-20T09:00:00.000000Z",
      "user": {
        "id": 104,
        "name": "David Lee",
        "email": "david@example.com",
        "phone": "4443332222",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=DL",
        "device_token": "token_dl321",
        "email_verified_at": "2025-07-19T05:00:00.000000Z",
        "created_at": "2025-07-17T05:00:00.000000Z",
        "updated_at": "2025-07-20T09:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 5,
      "description": "Average service, room for improvement.",
      "star": 3,
      "user_id": 105,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 205,
      "date": "2025-07-19",
      "active": 1,
      "created_at": "2025-07-19T13:00:00.000000Z",
      "updated_at": "2025-07-19T13:00:00.000000Z",
      "user": {
        "id": 105,
        "name": "Eva Adams",
        "email": "eva@example.com",
        "phone": "7776665555",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=EA",
        "device_token": "token_ea654",
        "email_verified_at": "2025-07-18T04:00:00.000000Z",
        "created_at": "2025-07-16T04:00:00.000000Z",
        "updated_at": "2025-07-19T13:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 6,
      "description": "Excellent service and communication.",
      "star": 5,
      "user_id": 106,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 206,
      "date": "2025-07-18",
      "active": 1,
      "created_at": "2025-07-18T15:00:00.000000Z",
      "updated_at": "2025-07-18T15:00:00.000000Z",
      "user": {
        "id": 106,
        "name": "Faisal Khan",
        "email": "faisal@example.com",
        "phone": "8889990000",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=FK",
        "device_token": "token_fk987",
        "email_verified_at": "2025-07-17T03:00:00.000000Z",
        "created_at": "2025-07-15T03:00:00.000000Z",
        "updated_at": "2025-07-18T15:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 7,
      "description": "Bad experience. Trash wasn’t picked up at all.",
      "star": 1,
      "user_id": 107,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 207,
      "date": "2025-07-17",
      "active": 1,
      "created_at": "2025-07-17T08:00:00.000000Z",
      "updated_at": "2025-07-17T08:00:00.000000Z",
      "user": {
        "id": 107,
        "name": "George Blake",
        "email": "george@example.com",
        "phone": "9998887777",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=GB",
        "device_token": "token_gb112",
        "email_verified_at": "2025-07-16T02:00:00.000000Z",
        "created_at": "2025-07-14T02:00:00.000000Z",
        "updated_at": "2025-07-17T08:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 8,
      "description": "Service was quick and staff was polite.",
      "star": 4,
      "user_id": 108,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 208,
      "date": "2025-07-16",
      "active": 1,
      "created_at": "2025-07-16T11:00:00.000000Z",
      "updated_at": "2025-07-16T11:00:00.000000Z",
      "user": {
        "id": 108,
        "name": "Hannah Wells",
        "email": "hannah@example.com",
        "phone": "1231231234",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=HW",
        "device_token": "token_hw223",
        "email_verified_at": "2025-07-15T01:00:00.000000Z",
        "created_at": "2025-07-13T01:00:00.000000Z",
        "updated_at": "2025-07-16T11:00:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 9,
      "description": "Will not recommend. Late arrival and rude behavior.",
      "star": 2,
      "user_id": 109,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 209,
      "date": "2025-07-15",
      "active": 1,
      "created_at": "2025-07-15T10:30:00.000000Z",
      "updated_at": "2025-07-15T10:30:00.000000Z",
      "user": {
        "id": 109,
        "name": "Ivan Chen",
        "email": "ivan@example.com",
        "phone": "3213214321",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=IC",
        "device_token": "token_ic556",
        "email_verified_at": "2025-07-14T00:00:00.000000Z",
        "created_at": "2025-07-12T00:00:00.000000Z",
        "updated_at": "2025-07-15T10:30:00.000000Z",
        "deleted_at": null
      }
    },
    {
      "id": 10,
      "description": "Fair price and fast pickup. Would use again.",
      "star": 4,
      "user_id": 110,
      "reviewable_type": "App\\Models\\Booking",
      "reviewable_id": 210,
      "date": "2025-07-14",
      "active": 1,
      "created_at": "2025-07-14T13:00:00.000000Z",
      "updated_at": "2025-07-14T13:00:00.000000Z",
      "user": {
        "id": 110,
        "name": "Julia Stone",
        "email": "julia@example.com",
        "phone": "5556667777",
        "is_admin": 0,
        "image": "https://dummyimage.com/200x200/000/fff&text=JS",
        "device_token": "token_js999",
        "email_verified_at": "2025-07-13T10:00:00.000000Z",
        "created_at": "2025-07-11T10:00:00.000000Z",
        "updated_at": "2025-07-14T13:00:00.000000Z",
        "deleted_at": null
      }
    }
  ]

