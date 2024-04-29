import {
	BooleanInput,
	Edit,
	NumberInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";

const ChallengeOptionEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<NumberInput source="id" />
				<BooleanInput
					source="correct"
					validate={[required()]}
					label="correct"
				/>
				<ReferenceInput source="challengeId" reference="challenges" />
				<TextInput
					source="imageSrc"
					validate={[required()]}
					label="imageSrc"
				/>
				<TextInput
					source="audioSrc"
					validate={[required()]}
					label="audioSrc"
				/>
			</SimpleForm>
		</Edit>
	);
};

export default ChallengeOptionEdit;
