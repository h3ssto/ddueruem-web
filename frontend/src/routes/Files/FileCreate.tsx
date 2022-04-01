import React, { Component } from 'react';
import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { default as Modal } from '../../components/Modal';
import api from '../../services/api.service';
import isNumeric from '../../services/numbers.service';

const API_URL = process.env.REACT_APP_DOMAIN;

type Props = {};

type State = {
  label: string;
  description?: string;
  file?: File;
  gottenLicenses: Array<{label: string; value: string}>;
  gottenTags: Array<{ label: string; value: string }>;
  gottenFiles: Array<{ value: number; label: string }>;
  gottenFamilies: Array<{ value: number; label: string }>;
  newVersionOf: string;
  featureFamily: string;
  license: string;
  tags: string;
  loading: boolean;
  legalShare: boolean;
  userData: boolean;
  openSource: boolean;
  newVersionOfSelection: boolean;
  featureModelFamilySelection: boolean;
};

/**
 * This route is responsible for the file upload.
 * It is only visible for authenticated users.
 */
export default class FileCreate extends Component<Props, State> {
  /**
   * Constructor for file creation. It uses two fetch calls
   * to get all available tags and all available files.
   * @param {Props} props are empty
   */
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.getTags();
    this.getNewVersionOf();
    this.getFamilies();
    this.getLicenses();

    this.state = {
      label: '',
      description: undefined,
      file: undefined,
      gottenLicenses: [],
      gottenTags: [],
      gottenFiles: [],
      gottenFamilies: [],
      tags: '',
      newVersionOf: '---',
      featureFamily: '---',
      license: '',
      loading: false,
      legalShare: false,
      userData: false,
      openSource: false,
      featureModelFamilySelection: true,
      newVersionOfSelection: true,
    };
  }

  getTags = async () => {
    await api.get(`${API_URL}tags/`).then((response) => {
      let tags = response.data;
      tags = tags.map((tag: { id: number; label: string }) => ({
        value: tag.id,
        label: tag.label,
      }));
      this.setState({ gottenTags: tags });
      return tags;
    });
  };

  getFamilies = async () => {
    await api.get(`${API_URL}families/`).then((response) => {
      let families = response.data;
      families = families.map((family: { id: number; label: string }) => ({
        value: family.id,
        label: family.label,
      }));
      this.setState({ gottenFamilies: families });
      return families;
    });
  };

  getLicenses = () => {
    api.get(`${API_URL}licenses/`).then((response) => {
      let licenses = response.data;
      licenses = licenses.map((license: { id: number; label: string }) => ({
        value: license.id,
        label: license.label,
      }));
      this.setState({ gottenLicenses: licenses });
      return licenses;
    });
  };

  getNewVersionOf = () => {
    api.get(`${API_URL}files/`).then((response) => {
      let files = response.data;
      files = files.map((file: { id: number; label: string }) => ({
        value: file.id,
        label: file.label,
      }));
      this.setState({ gottenFiles: files });
    });
  };

  onTagChange = (options: any) => {
    if (!this.state.gottenTags.some((e) => options[options.length - 1].label === e.label)) {
      api
        .post(`${API_URL}tags/`, { label: options[options.length - 1].label, description: '' })
        .then(async () => {
          await this.getTags();

          const tags = this.getTagsWithTagId(options);

          this.setState({
            tags,
          });
        });
    } else {
      const tags = this.getTagsWithTagId(options);

      this.setState({
        tags,
      });
    }
  };

  private getTagsWithTagId = (options: any) => options.map((option: any) => {
    let id = option.value;

    if (!Number.isInteger(id)) {
      const newElement = this.state.gottenTags.find((element) => (element.label === option.value));

      if (newElement && newElement.value) {
        id = newElement.value;
      }
    }

    return {
      id,
      label: option.label,
    };
  });

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target as HTMLInputElement;
    this.setState({ label: label.value });
  };

  onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description = e.target as HTMLInputElement;
    this.setState({ description: description.value });
  };

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target as HTMLInputElement;
    if (file.files) {
      this.setState({ file: file.files[0] });
    }
  };

  onNewVersionOfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersionOf = e.target as HTMLSelectElement;
    this.setState({ newVersionOf: newVersionOf.value });

    if (newVersionOf.value === '---') {
      this.setState({ featureModelFamilySelection: true });
    } else {
      this.setState({ featureModelFamilySelection: false });
    }
  };

  onNewFamilyChange = (option: any) => {
    if (option.value === '') {
      this.setState({ newVersionOfSelection: true });
    } else {
      this.setState({ newVersionOfSelection: false });
    }

    if (!this.state.gottenFamilies.some((e) => option.label === e.label)) {
      api
        .post(`${API_URL}families/`, { label: option.label, description: '' })
        .then(async () => {
          await this.getFamilies();

          const featureFamily = this.getFamilyWithFamilyId(option);

          this.setState({
            featureFamily,
          });
        });
    } else {
      const featureFamily = this.getFamilyWithFamilyId(option);

      this.setState({
        featureFamily,
      });
    }
  };

  private getFamilyWithFamilyId = (option: any) => {
    let id = option.value;

    if (!isNumeric(id)) {
      const newElement = this.state.gottenFamilies
        .find((element) => (element.label === option.value));

      if (newElement && newElement.value) {
        id = newElement.value;
      }
    }

    return id;
  };

  onLicenseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const license = e.target as HTMLSelectElement;
    this.setState({ license: license.value });
  };

  isReady = () => this.state.tags
    && !(this.state.license === '---')
    && this.state.label
    && this.state.file
    && this.state.description
    && this.state.legalShare
    && this.state.userData
    && this.state.openSource
    && this.state.license !== '---'
    && this.state.license
    && !(this.state.featureFamily === '---' && this.state.newVersionOf === '---');

  onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      this.state.tags
      && this.state.label
      && this.state.file
      && this.state.description
      && this.state.legalShare
      && this.state.userData
      && this.state.openSource
      && this.state.license !== '---'
      && !(this.state.featureFamily === '---' && this.state.newVersionOf === '---')
    ) {
      this.setState({ loading: true });
      const data = new FormData();

      data.append('label', this.state.label);
      data.append('description', this.state.description);
      data.append('local_file', this.state.file);
      data.append('license', this.state.license);
      if (this.state.newVersionOf !== '---') {
        data.append('new_version_of', this.state.newVersionOf);
      }
      if (this.state.featureFamily !== '---') {
        data.append('family', this.state.featureFamily);
      }
      data.append('tags', JSON.stringify(this.state.tags));

      api
        .post(`${API_URL}files/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          Modal.fire({
            icon: 'success',
            title: 'Success!!',
            text: 'File was uploaded successfully!',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          this.setState({ loading: false });
          Modal.fire({
            icon: 'error',
            title: 'Error!!',
            text: JSON.stringify(error.message),
          });
        });
    }
  };

  /**
   * Renders the file upload form.
   * @return {JSX} the component.
   */
  render() {
    return (
      <Container>
        <Row>
          <form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>File name</Form.Label>
              <Form.Control
                data-testid="label"
                onChange={this.onLabelChange}
                placeholder="Leave a filename"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                data-testid="description"
                as="textarea"
                maxLength={250}
                onChange={this.onDescriptionChange}
                placeholder="Leave a comment here"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File Upload</Form.Label>
              <Form.Control
                data-testid="file-upload"
                type="file"
                onChange={this.onFileChange}
                accept=".xml"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>License</Form.Label>
              <Form.Select data-testid="license" onChange={this.onLicenseChange} defaultValue="---">
                {this.state.gottenLicenses.map((key) => (
                  <option key={key.value} value={key.value}>
                    {key.value}
                    :
                    {key.label}
                  </option>
                ))}
                <option key="---" value="---">
                  ---
                </option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Form.Group className="col-sm">
                <Form.Label>New version of</Form.Label>
                <Form.Select
                  data-testid="version"
                  onChange={this.onNewVersionOfChange}
                  disabled={!this.state.newVersionOfSelection ?? undefined}
                  defaultValue="---"
                >
                  {this.state.gottenFiles.map((key) => (
                    <option key={key.value} value={key.value}>
                      {key.value}
                      :
                      {key.label}
                    </option>
                  ))}
                  <option key="---" value="---">
                    ---
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-sm">
                <Form.Label htmlFor="families">Feature model family</Form.Label>
                <CreatableSelect
                  isDisabled={!this.state.featureModelFamilySelection ?? undefined}
                  name="families"
                  inputId="families"
                  onChange={this.onNewFamilyChange}
                  options={this.state.gottenFamilies}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="tags">Tags</Form.Label>
              <CreatableSelect
                isMulti
                name="tags"
                inputId="tags"
                onChange={this.onTagChange}
                options={this.state.gottenTags}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                data-testid="legal-share"
                type="checkbox"
                checked={this.state.legalShare}
                onChange={() => this.setState({ legalShare: !this.state.legalShare })}
                id="legal-share"
                label="I am legally allowed to share this model"
              />
              <Form.Check
                data-testid="user-data"
                type="checkbox"
                checked={this.state.userData}
                onChange={() => this.setState({ userData: !this.state.userData })}
                id="user-data"
                label="My email and a date will always be tied to the file
                 upload (even after account deletion)"
              />
              <Form.Check
                data-testid="open-source"
                type="checkbox"
                checked={this.state.openSource}
                onChange={() => this.setState({ openSource: !this.state.openSource })}
                id="open-source"
                label="All information will be published according to your
                 chosen license"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !this.isReady() || this.state.loading ? true : undefined
              }
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              Upload!
            </Button>
          </form>
        </Row>
      </Container>
    );
  }
}
