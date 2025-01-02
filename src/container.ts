import { Container, ContainerModule } from "inversify";
import {UserController} from "./controllers/user";
const container: Container = new Container();

const bindings = new ContainerModule((bind) => {
    container.bind<UserController>(UserController).toSelf();
});

container.load(bindings);

export default container;