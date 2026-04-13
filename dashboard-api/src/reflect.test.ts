import "reflect-metadata";

function Injectable(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata("a", 1, target);
    const meta = Reflect.getMetadata("a", target);
    console.log(meta);
  };
}

function Inject(key: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    Reflect.defineMetadata("a", 1, target);
    const meta = Reflect.getMetadata("a", target);
    console.log(meta);
  };
}

@Injectable("C")
class C {}

@Injectable("D")
class D {
  constructor(@Inject("C") c: C) {}
}
