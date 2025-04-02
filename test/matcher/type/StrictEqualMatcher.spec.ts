import {Matcher} from "../../../src/matcher/type/Matcher";
import {strictEqual} from "../../../src/ts-mockito";

describe("StrictEqualMatcher", () => {
    describe("checking if string representation of number matches with number", () => {
        it("returns false", () => {
            // given
            let testObj: Matcher = strictEqual("5");

            // when
            let result = testObj.match(5);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if false matches with zero", () => {
        it("returns false", () => {
            // given
            let testObj: Matcher = strictEqual(false);

            // when
            let result = testObj.match(0);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if true matches with one", () => {
        it("returns false", () => {
            // given
            let testObj: Matcher = strictEqual(true);

            // when
            let result = testObj.match(1);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if same strings matches", () => {
        it("returns true", () => {
            // given
            let testObj: Matcher = strictEqual("5");

            // when
            let result = testObj.match("5");

            // then
            expect(result).toBeTruthy();
        });
    });
});
