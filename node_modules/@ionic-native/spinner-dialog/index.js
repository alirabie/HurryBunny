var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var SpinnerDialogOriginal = /** @class */ (function (_super) {
    __extends(SpinnerDialogOriginal, _super);
    function SpinnerDialogOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerDialogOriginal.prototype.show = function (title, message, cancelCallback, iOSOptions) { return cordova(this, "show", { "sync": true }, arguments); };
    SpinnerDialogOriginal.prototype.hide = function () { return cordova(this, "hide", { "sync": true }, arguments); };
    SpinnerDialogOriginal.pluginName = "SpinnerDialog";
    SpinnerDialogOriginal.plugin = "cordova-plugin-native-spinner";
    SpinnerDialogOriginal.pluginRef = "SpinnerDialog";
    SpinnerDialogOriginal.repo = "https://github.com/greybax/cordova-plugin-native-spinner";
    SpinnerDialogOriginal.platforms = ["Android", "iOS", "Windows Phone 8", "Windows"];
    return SpinnerDialogOriginal;
}(IonicNativePlugin));
var SpinnerDialog = new SpinnerDialogOriginal();
export { SpinnerDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3NwaW5uZXItZGlhbG9nL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQXNEckMsaUNBQWlCOzs7O0lBWWxELDRCQUFJLGFBQUMsS0FBYyxFQUFFLE9BQWdCLEVBQUUsY0FBb0IsRUFBRSxVQUFvQztJQVNqRyw0QkFBSTs7Ozs7O3dCQTVFTjtFQXVEbUMsaUJBQWlCO1NBQXZDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTcGlubmVyRGlhbG9nSU9TT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBPcGFjaXR5IG9mIHRoZSBvdmVybGF5LCBiZXR3ZWVuIDAgKHRyYW5zcGFyZW50KSBhbmQgMSAob3BhcXVlKS4gRGVmYXVsdDogMC4zNVxuICAgKi9cbiAgb3ZlcmxheU9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlZCBjb21wb25lbnQgb2YgdGhlIHRleHQgY29sb3IsIGJldHdlZW4gMCBhbmQgMS4gRGVmYXVsdDogMVxuICAgKi9cbiAgdGV4dENvbG9yUmVkPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHcmVlbiBjb21wb25lbnQgb2YgdGhlIHRleHQgY29sb3IsIGJldHdlZW4gMCBhbmQgMS4gRGVmYXVsdDogMVxuICAgKi9cbiAgdGV4dENvbG9yR3JlZW4/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEJsdWUgY29tcG9uZW50IG9mIHRoZSB0ZXh0IGNvbG9yLCBiZXR3ZWVuIDAgYW5kIDEuIERlZmF1bHQ6IDFcbiAgICovXG4gIHRleHRDb2xvckJsdWU/OiBudW1iZXI7XG59XG5cbi8qKlxuICogQG5hbWUgU3Bpbm5lciBEaWFsb2dcbiAqIEBkZXNjcmlwdGlvblxuICogQ29yZG92YSBwbHVnaW4gZm9yIHNob3dpbmcgYSBuYXRpdmUgc3Bpbm5lciBiYXNlZCBvbiBQYWxkb20vU3Bpbm5lckRpYWxvZy5cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogYGNvcmRvdmEtcGx1Z2luLW5hdGl2ZS1zcGlubmVyYC4gRm9yIG1vcmUgaW5mbywgcGxlYXNlIHNlZSB0aGUgW1NwaW5uZXIgRGlhbG9nIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vZ3JleWJheC9jb3Jkb3ZhLXBsdWdpbi1uYXRpdmUtc3Bpbm5lcikuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBTcGlubmVyRGlhbG9nIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9zcGlubmVyLWRpYWxvZy9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgc3Bpbm5lckRpYWxvZzogU3Bpbm5lckRpYWxvZykgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5zcGlubmVyRGlhbG9nLnNob3coKTtcbiAqXG4gKiB0aGlzLnNwaW5uZXJEaWFsb2cuaGlkZSgpO1xuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogU3Bpbm5lckRpYWxvZ0lPU09wdGlvbnNcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdTcGlubmVyRGlhbG9nJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tbmF0aXZlLXNwaW5uZXInLFxuICBwbHVnaW5SZWY6ICdTcGlubmVyRGlhbG9nJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9ncmV5YmF4L2NvcmRvdmEtcGx1Z2luLW5hdGl2ZS1zcGlubmVyJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJywgJ1dpbmRvd3MgUGhvbmUgOCcsICdXaW5kb3dzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Bpbm5lckRpYWxvZyBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcblxuICAvKipcbiAgICogU2hvd3MgdGhlIHNwaW5uZXIgZGlhbG9nXG4gICAqIEBwYXJhbSB0aXRsZSB7c3RyaW5nfSBTcGlubmVyIHRpdGxlIChzaG93cyBvbiBBbmRyb2lkIG9ubHkpXG4gICAqIEBwYXJhbSBtZXNzYWdlIHtzdHJpbmd9IFNwaW5uZXIgbWVzc2FnZVxuICAgKiBAcGFyYW0gY2FuY2VsQ2FsbGJhY2sge2Jvb2xlYW58ZnVuY3Rpb259IFNldCB0byB0cnVlIHRvIHNldCBzcGlubmVyIG5vdCBjYW5jZWxhYmxlLiBPciBwcm92aWRlIGEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSB1c2VyIGNhbmNlbHMgdGhlIHNwaW5uZXIuXG4gICAqIEBwYXJhbSBpT1NPcHRpb25zIHtvYmplY3R9IE9wdGlvbnMgZm9yIGlPUyBvbmx5XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZVxuICB9KVxuICBzaG93KHRpdGxlPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nLCBjYW5jZWxDYWxsYmFjaz86IGFueSwgaU9TT3B0aW9ucz86IFNwaW5uZXJEaWFsb2dJT1NPcHRpb25zKTogdm9pZCB7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHNwaW5uZXIgZGlhbG9nIGlmIHZpc2libGVcbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlXG4gIH0pXG4gIGhpZGUoKTogdm9pZCB7XG4gIH1cblxufVxuIl19