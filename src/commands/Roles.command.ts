import { Message } from 'discord.js';
import { ACTIONS } from '../constants/rolesActions';
import RolesController from '../controllers/RolesController';

// export default class Roles extends Command {
//   async onMessage(msg: Message, prompt: Prompt) {
//     const action = prompt.args[0];

//     const rolesController = new RolesController(msg.guild);

//     switch (action) {
//       case ACTIONS.create:
//         rolesController.create();
//         break;
//       default:
//         break;
//     }
//   }
// }
