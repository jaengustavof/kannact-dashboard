import "@testing-library/jest-dom";

if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    const event = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  };
}
