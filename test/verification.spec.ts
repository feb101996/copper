import {instance, mock, verify} from "../src/ts-mockito";
import {MethodCallToStringConverter} from "../src/utils/MethodCallToStringConverter";
import {Bar} from "./utils/Bar";
import {Foo} from "./utils/Foo";

let cases = [
    {desc: "verifying mocked object", fooClass: Foo, barClass: Bar},
    {desc: "verifying mocked interface", fooClass: undefined, barClass: undefined},
];

if (typeof Proxy === "undefined") {
    cases = [{desc: "verifying mocked object", fooClass: Foo, barClass: Bar}];
}

cases.forEach(testData => {
    describe(testData.desc, () => {
        let mockedFoo: Foo;
        let foo: Foo;
        let mockedBar: Bar;
        let bar: Bar;
        var methodCallToStringConverter: MethodCallToStringConverter = new MethodCallToStringConverter();

        beforeEach(() => {
            mockedFoo = mock(testData.fooClass);
            foo = instance(mockedFoo);
            mockedBar = mock(testData.barClass);
            bar = instance(mockedBar);
        });

        describe("when no calls are expected", () => {
            describe("and no one occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).never();
                    } catch (e) {
                        fail("Expected method to be called just once");
                    }
                });
            });

            describe("and one occurred but with different argument", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue + 321);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).never();
                    } catch (e) {
                        fail("Expected method to be called just once");
                    }
                });
            });

            describe("and one occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).never();
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 0, 1);
                });
            });
        });

        describe("when one call is expected", () => {
            describe("and just one occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).called();
                        verify(mockedFoo.convertNumberToString(sampleValue)).once();
                        verify(mockedFoo.convertNumberToString(sampleValue)).times(1);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(1);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atMost(1);
                    } catch (e) {
                        fail("Expected method to be called just once");
                    }
                });
            });

            describe("and arguments are optional", () => {
                describe("but just first one is given", () => {
                    it("throws error", () => {
                        // given
                        foo.sampleMethodWithTwoOptionalArguments(5);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.sampleMethodWithTwoOptionalArguments(5, 6)).called();
                        } catch (e) {
                            error = e;
                        }
                        expect(error).toBeTruthy();
                    });
                });
            });

            describe("and arguments are optional", () => {
                it("verifies call count correctly", () => {
                    // given
                    foo.sampleMethodWithTwoOptionalArguments(5);
                    foo.sampleMethodWithTwoOptionalArguments(5);
                    foo.sampleMethodWithTwoOptionalArguments(5, 6);

                    // when
                    verify(mockedFoo.sampleMethodWithTwoOptionalArguments(5)).twice();
                    verify(mockedFoo.sampleMethodWithTwoOptionalArguments(5, 6)).once();
                });
            });

            describe("but two has occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).once();
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 1, 2);
                });
            });
        });

        describe("when two calls are expected", () => {
            describe("and just two occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).called();
                        verify(mockedFoo.convertNumberToString(sampleValue)).twice();
                        verify(mockedFoo.convertNumberToString(sampleValue)).times(2);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                    } catch (e) {
                        fail("Expected method to be called twice");
                    }
                });
            });

            describe("but just one has occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).twice();
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 2, 1);
                });
            });
        });

        describe("when three calls are expected", () => {
            describe("and just three occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).called();
                        verify(mockedFoo.convertNumberToString(sampleValue)).thrice();
                        verify(mockedFoo.convertNumberToString(sampleValue)).times(3);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(3);
                        verify(mockedFoo.convertNumberToString(sampleValue)).atMost(3);
                    } catch (e) {
                        fail("Expected method to be called thrice");
                    }
                });
            });

            describe("but four has occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).thrice();
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 3, 4);
                });
            });
        });

        describe("when at least two calls are expected", () => {
            describe("but three has occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                    } catch (e) {
                        fail("Expected method to be called at least two times");
                    }
                });
            });

            describe("but just one occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 2, 1);
                });
            });
        });

        describe("when at most two calls are expected", () => {
            describe("but one has occurred", () => {
                it("doesn't throw error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);

                    // when
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                    } catch (e) {
                        fail("Expected method to be called at most two times");
                    }
                });
            });

            describe("but just three occurred", () => {
                it("throws error", () => {
                    // given
                    var sampleValue = 3;
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);
                    foo.convertNumberToString(sampleValue);

                    // when
                    let error;
                    try {
                        verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                    } catch (e) {
                        error = e;
                    }

                    // then
                    verifyCallCountErrorMessage(error, 2, 3);
                });
            });
        });

        describe("when more than one method has same expectations", () => {
            it("method call counts are separated for every method", () => {
                // given
                var param = 3;

                // when
                foo.getStringById(param);
                foo.convertNumberToString(param);
                foo.convertNumberToString(param);

                // then
                verify(mockedFoo.getStringById(param)).once();
                verify(mockedFoo.convertNumberToString(param)).twice();
            });
        });

        describe("checking if method has been called before other", () => {
            describe("when both of them are from same object", () => {
                describe("and method with first param has been called before second", () => {
                    it("doesn't throw error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        foo.convertNumberToString(firstCallParam);
                        foo.convertNumberToString(secondCallParam);

                        // then
                        verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedFoo.convertNumberToString(secondCallParam));
                    });
                });

                describe("but method with first param has been called after second", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(secondCallParam);
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain("but has been called after.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first and second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain("none of them has been called.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });
            });
        });

        describe("checking if method has been called after other", () => {
            describe("when both of them are from same object", () => {
                describe("and method with first param has been called after second", () => {
                    it("doesn't throw error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        foo.convertNumberToString(secondCallParam);
                        foo.convertNumberToString(firstCallParam);

                        // then
                        verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedFoo.convertNumberToString(secondCallParam));
                    });
                });

                describe("but method with first param has been called before second", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);
                        foo.convertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain("but has been called before.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first and second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedFoo.convertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain("none of them has been called.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });
            });
        });

        describe("checking if method has been called before other", () => {
            describe("when they are from different objects", () => {
                describe("and method with first param has been called before second", () => {
                    it("doesn't throw error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        foo.convertNumberToString(firstCallParam);
                        bar.differentConvertNumberToString(secondCallParam);

                        // then
                        verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedBar.differentConvertNumberToString(secondCallParam));
                    });
                });

                describe("but method with first param has been called after second", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        bar.differentConvertNumberToString(secondCallParam);
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain("but has been called after.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        bar.differentConvertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first and second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledBefore(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called before");
                        expect(error.message).toContain("none of them has been called.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });
            });
        });

        describe("checking if method has been called after other", () => {
            describe("when they are from different objects", () => {
                describe("and method with first param has been called after second", () => {
                    it("doesn't throw error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        bar.differentConvertNumberToString(secondCallParam);
                        foo.convertNumberToString(firstCallParam);

                        // then
                        verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedBar.differentConvertNumberToString(secondCallParam));
                    });
                });

                describe("but method with first param has been called before second", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);
                        bar.differentConvertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain("but has been called before.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        bar.differentConvertNumberToString(secondCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;
                        foo.convertNumberToString(firstCallParam);

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain(`${methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any)}has never been called.`);
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });

                describe("but method with first and second param has never been called", () => {
                    it("throws error", () => {
                        // given
                        var firstCallParam = 5;
                        var secondCallParam = 10;

                        // when
                        let error;
                        try {
                            verify(mockedFoo.convertNumberToString(firstCallParam)).calledAfter(mockedBar.differentConvertNumberToString(secondCallParam));
                        } catch (e) {
                            error = e;
                        }

                        // then
                        var firstCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedFoo.convertNumberToString(firstCallParam) as any));
                        var secondCallMsgIndex = error.message.indexOf(methodCallToStringConverter.convert(mockedBar.differentConvertNumberToString(secondCallParam) as any));
                        expect(error.message).toContain("to be called after");
                        expect(error.message).toContain("none of them has been called.");
                        expect(firstCallMsgIndex).toBeLessThan(secondCallMsgIndex);
                    });
                });
            });
        });

        describe("matcher error messages", () => {
            it("should describe expected method call", () => {
                instance(mockedFoo).getStringById(2);

                try {
                    // when
                    verify(mockedFoo.getStringById(1)).once();

                    expect(true).toBe(false); // Above call should throw an exception
                } catch (e) {
                    // then
                    expect(e.message).toContain("Expected \"getStringById(strictEqual(1))\" to be called 1 time(s). But has been called 0 time(s).\n");
                    expect(e.message).toContain("Actual calls:\n");
                    expect(e.message).toContain("getStringById(2)");
                }
            });
        });
    });
});

function verifyCallCountErrorMessage(error, expectedCallCount, receivedCallCount): void {
    expect(error.message).toContain(`${expectedCallCount} time(s). But`);
    expect(error.message).toContain(`has been called ${receivedCallCount} time(s)`);
}
