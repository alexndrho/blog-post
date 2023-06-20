import { styled } from '../../stitches.config';
import {
  Form,
  Label,
  Input,
  TextArea,
  Button,
  Select,
  Option,
} from '../common/form';
import { updateBlog } from '../../utils/blogsApi';
import { IBlogData } from '../../types/IBlog';
import { ChangeEvent, useState } from 'react';

const ButtonContainer = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '0.5rem',

  '& button': {
    flexGrow: 1,
  },
});

const BodyLabelContainer = styled('div', {
  marginBottom: '0.5em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface Props {
  id: IBlogData['_id'];
  title: IBlogData['title'];
  snippet: IBlogData['snippet'];
  body: IBlogData['body'];
  format: IBlogData['format'];
  onCancel: () => void;
}

const EditBlog = ({ id, title, snippet, body, format, onCancel }: Props) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [inputSnippet, setInputSnippet] = useState(snippet);
  const [inputBody, setInputBody] = useState(body);
  const [selectedFormat, setSelectedFormat] = useState(format);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      console.log(id, inputTitle, inputSnippet, inputBody, selectedFormat);

      const data = await updateBlog(
        id,
        inputTitle,
        inputSnippet,
        inputBody,
        selectedFormat
      );

      if (data?.error) throw data.error;

      setIsSaving(false);
      onCancel();
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value as IBlogData['format']);
  };

  return (
    <Form onSubmit={handleSave}>
      <Label htmlFor="form-title" mb0_5>
        Title
      </Label>
      <Input
        id="form-title"
        defaultValue={title}
        onChange={(e) => setInputTitle(e.target.value)}
        mb1
      />

      <Label htmlFor="form-snippet" mb0_5>
        Snippet
      </Label>
      <Input
        id="form-snippet"
        defaultValue={snippet}
        onChange={(e) => setInputSnippet(e.target.value)}
        mb1
      />

      <BodyLabelContainer>
        <Label htmlFor="form-body">Body</Label>

        <Select value={selectedFormat} onChange={handleSelectChange}>
          <Option value="markdown">Markdown</Option>
          <Option value="html">HTML</Option>
        </Select>
      </BodyLabelContainer>
      <TextArea
        id="form-body"
        defaultValue={body}
        onChange={(e) => setInputBody(e.target.value)}
        mb1
      />

      <ButtonContainer>
        <Button type="submit">{!isSaving ? 'Save' : 'Saving...'}</Button>
        <Button type="button" color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default EditBlog;
