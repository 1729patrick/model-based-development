import React from "react";
import { utils, SchemaForm} from "react-schema-form";
import "ace-builds";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import jsonWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-json";
import Localizer from "./data/tests/localizer";
import SelectLabel from "./data/selectlabel";
import ErrorBoundary from "./components/ErrorBoundary";

ace.config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl);

const examples = {
    localizer: Localizer,
    selectLabel: SelectLabel
};


class App extends React.Component {
    tempModel = {
        comments: [
            {
                name: "1"
            },
            {
                name: "2"
            }
        ]
    };

    state = {
        tests: [
            { label: "Song", value: "src/data/song.json" },
        ],
        validationResult: {},
        schema: {},
        form: [],
        model: {},
        schemaJson: "",
        formJson: "",
        selected: "",
        localization: undefined,
        showErrors: false
    };

    setStateDefault = () => this.setState({ model: this.tempModel });

    onSelectChange = ({ target: { value } }) => {
        if (!value) {
            this.setState({
                schemaJson: "",
                formJson: "",
                selected: "",
                schema: {},
                model: {},
                form: [],
                showErrors: false
            });
        }

        if (!value.endsWith("json")) {
            const elem = examples[value];
            this.setState({
                schemaJson: JSON.stringify(elem.schema, undefined, 2),
                formJson: JSON.stringify(elem.form, undefined, 2),
                selected: value,
                schema: elem.schema,
                model: elem.model || {},
                form: elem.form,
                localization: elem.localization,
                showErrors: false
            });
        } else {
            fetch(value)
                .then(x => x.json())
                .then(({ form, schema, model }) => {
                    this.setState({
                        schemaJson: JSON.stringify(schema, undefined, 2),
                        formJson: JSON.stringify(form, undefined, 2),
                        selected: value,
                        schema,
                        model: model || {},
                        form,
                        showErrors: false
                    });
                });
        }
    };

    onModelChange = (key, val, type) => {
        const { model } = this.state;
        const newModel = model;
        utils.selectOrSet(key, newModel, val, type);
        this.setState({ model: newModel });
    };

    onValidate = () => {
        const { schema, model } = this.state;
        const result = utils.validateBySchema(schema, model);
        this.setState({ validationResult: result, showErrors: true });
    };

    onFormChange = val => {
        try {
            const form = JSON.parse(val);
            this.setState({ formJson: val, form });
        } catch (e) {
            console.error(e);
        }
    };

    onSchemaChange = val => {
        try {
            const schema = JSON.parse(val);
            this.setState({ schemaJson: val, schema });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        const {
            schema,
            form,
            model,
            validationResult,
            selected,
            tests,
            formJson,
            schemaJson,
            localization,
            showErrors
        } = this.state;

        let schemaForm = "";
        let validate = "";
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
            validate = (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onValidate}
                    >
                        Validate
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.setStateDefault}
                    >
                        Throw temp model in
                    </Button>
                    <pre>{JSON.stringify(validationResult, undefined, 2)}</pre>
                </div>
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
                            theme="github"
                            height={window.innerHeight - 140}
                            width="100%"
                            style={{ flexGrow: 1 }}
                            onChange={this.onSchemaChange}
                            name="aceSchema"
                            value={schemaJson}
                            editorProps={{ $blockScrolling: true }}
                        />
                    </div>
                    <div className="col-sm-3">
                        <h3>Models</h3>
                        <FormControl
                            classes={{ root: "form-group" }}
                            style={{ minWidth: 150 }}
                        >
                            <InputLabel htmlFor="select-test">
                                Select Model
                            </InputLabel>
                            <Select
                                autoWidth
                                name="selectTest"
                                inputProps={{
                                    name: "selectTest",
                                    id: "select-test"
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

                        <h3>The Generated Form</h3>
                        {schemaForm}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
