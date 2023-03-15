import { userQuotesMock } from './../../test/mocks/userQuotesMock';
import { getStorageData, saveStorageData } from '../sessionStorage';


describe("sessionStorage", () => {
    afterEach(() => {
        // Initial Storage
        window.sessionStorage.clear();
    });

    it("return user quotes if there is data stored in the storage", () => {
        saveStorageData(userQuotesMock);

        expect(getStorageData()).toStrictEqual(userQuotesMock);
    });

    it("return null if there is no data in the storage", () => {
        expect(getStorageData()).toBeNull();
    });
});