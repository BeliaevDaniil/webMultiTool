
/**
 * Represents a generic Widget.
 * @class
 */
class Widget {
    /**
     * Activates the widget. This method should be implemented by subclasses.
     * @abstract
     * @throws {Error} If the method is not implemented.
     */
    activate() {
        throw new Error('Render method must be implemented');
    }
}

export default Widget