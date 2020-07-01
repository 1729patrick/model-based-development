import React from 'react';
import { utils, SchemaForm } from 'react-schema-form';
import 'ace-builds';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-dracula';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ErrorBoundary from './components/ErrorBoundary';
import api from './services/api';
import { toastSuccess, toastError } from './services/toast';

class App extends React.Component {
  tempModel = {
    comments: [
      {
        name: '1',
      },
      {
        name: '2',
      },
    ],
  };

  state = {
    tests: [
      { label: 'Album', value: require('./data/album.json') },
      { label: 'Artist', value: require('./data/artist.json') },
      { label: 'Genre', value: require('./data/genre.json') },
      { label: 'Song', value: require('./data/song.json') },
    ],
    schema: {},
    form: [],
    model: {},
    schemaJson: '',
    selected: '',
    localization: undefined,
    showErrors: false,
  };

  setStateDefault = () => this.setState({ model: this.tempModel });

  onSelectChange = ({ target: { value } }) => {
    const { form, schema, model } = value;

    this.setState({
      schemaJson: JSON.stringify(schema, undefined, 2),
      selected: value,
      schema,
      model: model || {},
      form,
      showErrors: false,
    });
  };

  onModelChange = (key, val, type) => {
    const { model } = this.state;
    const newModel = model;
    utils.selectOrSet(key, newModel, val, type);
    this.setState({ model: newModel });
  };

  onValidate = () => {};

  onFormChange = val => {};

  onSchemaChange = val => {
    try {
      const schema = JSON.parse(val);
      this.setState({ schemaJson: val, schema });
    } catch (e) {
      console.error(e);
    }
  };

  createModel = async () => {
    try {
      await api.post('generators', this.state.schema);

      toastSuccess('Model created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  render() {
    const {
      schema,
      form,
      model,
      selected,
      tests,
      schemaJson,
      localization,
      showErrors,
    } = this.state;

    let schemaForm = '';
    if (form.length > 0) {
      schemaForm = (
        <ErrorBoundary>
          <SchemaForm
            schema={schema}
            form={form}
            onModelChange={this.onModelChange}
            model={model}
            localization={localization}
            showErrors={showErrors}
          />
        </ErrorBoundary>
      );
    }

    return (
      <div className="col-md-12">
        <h1>JSON Schema Editor</h1>
        <div className="row">
          <div className="col-sm-9">
            <h3>Schema</h3>
            <AceEditor
              mode="json"
              theme="dracula"
              height={window.innerHeight - 140}
              width="100%"
              style={{ flexGrow: 1 }}
              onChange={this.onSchemaChange}
              name="aceSchema"
              value={schemaJson}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div
            className="col-sm-3"
            style={{
              height: window.innerHeight - 64,
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
            }}
          >
            <div>
              <h3>Models</h3>
              <FormControl
                classes={{ root: 'form-group' }}
                style={{ minWidth: 150, flex: 1, display: 'flex' }}
              >
                <InputLabel htmlFor="select-test">Select Model</InputLabel>
                <Select
                  autoWidth
                  name="selectTest"
                  inputProps={{
                    name: 'selectTest',
                    id: 'select-test',
                  }}
                  value={selected}
                  onChange={this.onSelectChange}
                >
                  {tests.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {schemaForm && <h3>The Generated Form</h3>}
              {schemaForm}
            </div>

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 'auto', width: '100%', marginBottom: 20 }}
              onClick={this.createModel}
            >
              CREATE MODEL
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
