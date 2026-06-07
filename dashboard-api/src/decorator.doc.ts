function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    target.prototype.id = id;
  };
}

function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
}

function Method(
  target: Object,
  propKey: string,
  propDescriptor: PropertyDescriptor,
) {
  console.log("init method", propKey);
  propDescriptor.value = function (...args: any[]) {
    return args[0] * 10;
  };
}

function Prop(target: Object, propKey: string) {
  console.log("init prop", propKey);
  let value: number;

  const getter = () => {
    console.log("get");
    return value;
  };

  const setter = (newValue: number) => {
    console.log("set");
    value = newValue;
  };

  Object.defineProperty(target, propKey, { get: getter, set: setter });
}

function Param(target: Object, propKey: string, index: number) {
  console.log("init param", propKey, index);
}

@Logger()
@Component(1)
export class User {
  @Prop
  id: number;

  constructor() {}

  @Method
  update(@Param newID: number) {
    this.id = newID;
    return this.id;
  }
}

console.log(new User().id);
console.log(new User().update(2));
