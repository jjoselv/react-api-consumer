import debounce from "./debounce";


describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
    })
    it('should call debounce', () => {
        const func = jest.fn();
        const [debouncedFuncion] = debounce(func, 1000);
        expect(func).not.toHaveBeenCalled(); // func not called yet

        // Call it immediately
        debouncedFuncion();
        expect(func).not.toHaveBeenCalled(); // func not called
        jest.runAllTimers();
        expect(func).toHaveBeenCalled(); // func called

    });
    it('should have been called only once until <x> seconds', () => {
        const func = jest.fn();
        const [debouncedFuncion] = debounce(func, 1000);

        // Call it several times with 10ms between each call
        for (let i = 0; i < 10; i++) {
            jest.advanceTimersByTime(10);
            debouncedFuncion();
        }
        expect(func).not.toHaveBeenCalled(); // func not called

        jest.runAllTimers();
        expect(func).toHaveBeenCalledTimes(1);  // func called
    });
    
    it('should not have been called when timeout cleared', () => {
        const func = jest.fn();
        const [debouncedFuncion, stopExecution] = debounce(func, 1000);

        // Call it immediately
        debouncedFuncion();
        jest.advanceTimersByTime(10);
        
        stopExecution();
        jest.runAllTimers();
        expect(func).not.toHaveBeenCalled(); // func not called
    });
});
