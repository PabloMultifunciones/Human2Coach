import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import environment from '../libs/environment';

// props
export default function UploadFile(props) {
  const { t } = useTranslation();
  const [file, setFile] = useState(false);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    props.getFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <Grid className="d-flex">
      {props.showUpload && (
        <div className="d-flex">
          <Button variant="contained" color="error">
            <BackupIcon className="mr-1" />
            <label htmlFor="avatar">
              {file ? t('change', 'Cambiar archivo') : t('import', 'Importar')}
            </label>
            <input
              type="file"
              className="fileInputUser"
              onChange={(e) => handleFile(e)}
              id="avatar"
              name="avatar"
            />
          </Button>

          <div> {file && <p className="ml-1">{file.name}</p>}</div>
        </div>
      )}
      {props.fileUrl && (
        <a
          target="_blank"
          without="true"
          rel="noreferrer"
          href={`${environment.motivarnosBackend}${props.fileUrl}`}
          className="link-button"
        >
          <Button className={props.showUpload ? 'ml-1' : ''} variant="contained" color="primary">
            <CloudDownloadIcon className="mr-1" />
            {t('download', 'Descargar')}
          </Button>
        </a>
      )}
    </Grid>
  );
}
