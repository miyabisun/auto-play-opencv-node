const rewire = require("rewire")
const Adb = rewire("./Adb")
const exec = Adb.__get__("exec")
// @ponicode
describe("exec", () => {
    test("0", () => {
        let callFunction = () => {
            exec("rgb(0.1,0.2,0.3)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            exec("#FF00FF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            exec("rgb(20%,10%,30%)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            exec("rgb(0,100,200)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            exec("hsl(10%,20%,40%)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            exec(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("shell", () => {
    let inst

    beforeEach(() => {
        inst = new Adb()
    })

    test("0", () => {
        let callFunction = () => {
            inst.shell("parse mobile firewall")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.shell("synthesize wireless microchip")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.shell("generate bluetooth firewall")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.shell("reboot neural card")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.shell("transmit bluetooth bus")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.shell(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("tap", () => {
    let inst

    beforeEach(() => {
        inst = new Adb()
    })

    test("0", () => {
        let callFunction = () => {
            inst.tap(4, 520)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.tap(30, 350)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.tap(90, 400)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.tap(1, 400)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.tap(70, 4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.tap(-Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("backup", () => {
    let inst

    beforeEach(() => {
        inst = new Adb()
    })

    test("0", () => {
        let callFunction = () => {
            inst.backup()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("start", () => {
    let inst

    beforeEach(() => {
        inst = new Adb()
    })

    test("0", () => {
        let callFunction = () => {
            inst.start("/path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.start("C:\\\\path\\to\\folder\\")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.start("path/to/folder/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.start(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.start("path/to/file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.start(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("stop", () => {
    let inst

    beforeEach(() => {
        inst = new Adb()
    })

    test("0", () => {
        let callFunction = () => {
            inst.stop()
        }
    
        expect(callFunction).not.toThrow()
    })
})
