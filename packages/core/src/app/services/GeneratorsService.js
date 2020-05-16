import ModelService from './ModelService';
import ControllerService from './ControllerService';

class GeneratorsService {
  async init(req, res) {
    const { title: name, properties } = {
      type: 'object',
      title: 'Song',
      required: ['userIdEmail', 'password'],
      properties: {
        userIdEmail: {
          title: 'UserId or Email',
          type: 'string',
        },
        password: {
          title: 'Password',
          type: 'string',
        },
        rememberMe: {
          title: 'Remember me',
          type: 'boolean',
          default: false,
        },
      },
    };

    const args = {
      name,
      model: name.toLowerCase(),
      properties,
    };

    const model = await ModelService.run({ args });
    const controller = await ControllerService.run({ args });

    res.json({ model });
  }
}

export default new GeneratorsService().init;
