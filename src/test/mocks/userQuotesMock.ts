import { UserQuotesType } from '~/types/user.type';

export const userQuotesMock: UserQuotesType = {
    history: [
        {
            "author": "Tony Robbins",
            "favorite": false,
            "id": "D6Yr5I9ikXXc",
            "quote": "If you do what you've always done, you'll get what you've always gotten."
        },
        {
            "author": "Napoleon Hill",
            "favorite": false,
            "id": "wdTamcKIF6Oc",
            "quote": "All achievements, all earned riches, have their beginning in an idea."
        },
    ],
    favorite: [
        {
            "author": "Marsha Petrie Sue",
            "favorite": true,
            "id": "osWsdfNtz9he",
            "quote": "Stay away from what might have been and look at what will be."
        },
        {
            "author": "Richard Bach",
            "favorite": true,
            "id": "iATG4bx96uc8",
            "quote": "You teach best what you most need to learn."
        }
    ]
}