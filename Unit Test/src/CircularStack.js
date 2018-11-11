function CircularStack(size) {
    this._size = size;
    this._curentPosition = 0;
    this._elementCount = 0;
    this._items = new Array(size);
};

CircularStack.prototype.GetSize = function () {
    return this._size;
};

CircularStack.prototype.GetElementCount = function () {
    return this._elementCount;
};

CircularStack.prototype.push = function (item) {
    this._items[this._curentPosition] = item;
    this._curentPosition = (this._curentPosition + 1) % this._size;
    this._elementCount = Math.min(this._elementCount + 1, this._size);
};

CircularStack.prototype.pop = function () {
    if (this._elementCount == 0) {
        return null;
    }
    var itemPosition = this._curentPosition - 1;
    if (itemPosition < 0) {
        itemPosition = this._size - 1;
    }

    var item = this._items[itemPosition];
    this._items[itemPosition] = null;

    this._curentPosition = itemPosition;

    this._elementCount -= 1;
    return item;
};

CircularStack.prototype.clear = function (cb) {
    this._curentPosition = 0;
    this._elementCount = 0;
    this._items = new Array(this._size);
};

module.exports = CircularStack;