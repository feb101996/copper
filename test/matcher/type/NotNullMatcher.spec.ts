import {Matcher} from "../../../src/matcher/type/Matcher";
import {notNull} from "../../../src/ts-mockito";

describe("NotNullMatcher", () => {
    describe("checking if null matches", () => {
        it("returns false", () => {
            // given
            let testObj: Matcher = notNull();

            // when
            let result = testObj.match(null);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if false matches", () => {
        it("returns true", () => {
            // given
            let testObj: Matcher = notNull();

            // when
            let result = testObj.match(false);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if zero matches", () => {
        it("returns true", () => {
            // given
            let testObj: Matcher = notNull();

            // when
            let result = testObj.match(0);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if sample object matches", () => {
        it("returns true", () => {
            // given
            let testObj: Matcher = notNull();

            // when
            let result = testObj.match({});

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true", () => {
            // given
            let testObj: Matcher = notNull();

            // when
            let result = testObj.match("sampleString");

            // then
            expect(result).toBeTruthy();
        });
    });
});
