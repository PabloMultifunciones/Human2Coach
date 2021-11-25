import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import '../GlobalStyles/styles.scss';
import '../GlobalStyles/avatar.scss';

import toastr from 'toastr';
import mergeImages from 'merge-images';
import Spinner from '../components/Spinner';

import menuBody from '../assets/images/user_avatar.svg';
import menuHat from '../assets/images/hat.svg';

import menuEyes from '../assets/images/eye.svg';
import menuMouth from '../assets/images/lips.svg';
import menuClothes from '../assets/images/clothes.svg';
import menuNose from '../assets/images/nose.svg';
import menuHair from '../assets/images/hair.svg';
import menuAccessories from '../assets/images/accessories.svg';
import money from '../assets/images/money.svg';

import { getAvatarRequest, saveAvatarRequest } from '../actions/avatarsActions';

import enviroment from '../libs/environment';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto'
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  },
  appBar: {
    position: 'relative'
  },
  formControl: {
    width: '100%',
    marginTop: '1rem'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%'
  }
}));

const CustomAvatar = (props) => (
  <div className="custom-avatar-wrapper">
    <span className="avatar-custom">
      {props.skin !== null ? <img className="skin" src={props.skin} alt="" /> : ''}
      {props.clothes !== null ? <img src={props.clothes} alt="" /> : ''}
      {props.mouth !== null ? <img src={props.mouth} alt="" /> : ''}
      {props.eyes !== null ? <img src={props.eyes} alt="" /> : ''}
      {props.nose !== null ? <img src={props.nose} alt="" /> : ''}
      {props.hair !== null ? <img src={props.hair} alt="" /> : ''}
      {props.hat !== null ? <img src={props.hat} alt="" /> : ''}
      {props.accessory !== null ? <img src={props.accessory} alt="" /> : ''}
    </span>
  </div>
);

const Avatar = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [sesion, setSesion] = useState(null);

  const [AvatarParts, setAvatarParts] = useState({
    skins: undefined,
    clothes: undefined,
    mouths: undefined,
    eyes: undefined,
    noses: undefined,
    hairs: undefined,
    hats: undefined,
    accessories: undefined
  });

  const [partSelected, setPartSelected] = useState('SKIN');

  const handleChange = (name, newPart) => {
    switch (name) {
      case 'SKIN':
        setAvatarParts((state) => ({ ...state, skins: newPart }));
        break;
      case 'EYE':
        setAvatarParts((state) => ({ ...state, eyes: newPart }));
        break;
      case 'MOUTH':
        setAvatarParts((state) => ({ ...state, mouths: newPart }));
        break;
      case 'BODY':
        setAvatarParts((state) => ({ ...state, clothes: newPart }));
        break;
      case 'NOSE':
        setAvatarParts((state) => ({ ...state, noses: newPart }));
        break;
      case 'HAIR':
        setAvatarParts((state) => ({ ...state, hairs: newPart }));
        break;
      case 'ACCESSORY':
        setAvatarParts((state) => ({ ...state, accessories: newPart }));
        break;
      case 'HAT':
        setAvatarParts((state) => ({ ...state, hats: newPart }));
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChangePart = (name) => {
    setPartSelected(name);
  };

  function toDataURL(src, callback, outputFormat) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  }

  const allToB64 = async (images, callback) => {
    let count = 0;
    const img = new Array(images.length);

    const a = () => {
      count += 1;
    };

    const countReturned = () => count;

    for (let i = 0; i < images.length; i += 1) {
      if (images[i] !== undefined) {
        toDataURL(images[i], (dataUrl) => {
          img[i] = new Image();
          img[i].src = dataUrl;
          img[i].onload = () => {
            a();
            if (countReturned() === images.length)
              callback(img.filter((value) => value.src !== '').map((value) => value.src));
          };
        });
      } else {
        count += 1;
        img[i] = { src: '' };
      }
    }
  };

  const mergeAvatar = (images, callBack) => {
    allToB64(images, (data) => {
      mergeImages(data).then((b64) => {
        callBack(b64);
      });
    });
  };

  const updateUser = async (data) => {
    if (sesion.user.coinBalance - getCoins() >= 0) {
      let status;
      await props.saveAvatarRequest(data).then((r) => (status = r));

      if (status === 'SUCCESS') {
        toastr.success('Avatar changed');
      } else {
        toastr.error('An error has occurred while trying saving avatar');
      }
    } else {
      toastr.error('You dont have enough coins');
    }
  };

  const getCoins = () => {
    let count = 0;
    if (AvatarParts.skins !== undefined)
      if (!AvatarParts.skins.isFree && AvatarParts.skins.isMine === false) {
        count += AvatarParts.skins.coins;
      }
    if (AvatarParts.clothes !== undefined)
      if (!AvatarParts.clothes.isFree && AvatarParts.clothes.isMine === false) {
        count += AvatarParts.clothes.coins;
      }
    if (AvatarParts.mouths !== undefined)
      if (!AvatarParts.mouths.isFree && AvatarParts.mouths.isMine === false) {
        count += AvatarParts.mouths.coins;
      }
    if (AvatarParts.eyes !== undefined)
      if (!AvatarParts.eyes.isFree && AvatarParts.eyes.isMine === false) {
        count += AvatarParts.eyes.coins;
      }
    if (AvatarParts.hairs !== undefined)
      if (!AvatarParts.hairs.isFree && AvatarParts.hairs.isMine === false) {
        count += AvatarParts.hairs.coins;
      }

    if (AvatarParts.hats !== undefined)
      if (!AvatarParts.hats.isFree && AvatarParts.hats.isMine === false) {
        count += AvatarParts.hats.coins;
      }
    if (AvatarParts.accessories !== undefined)
      if (!AvatarParts.accessories.isFree && AvatarParts.accessories.isMine === false) {
        count += AvatarParts.accessories.coins;
      }
    return count;
  };

  const getAvatar = async () => {
    let status;
    await props.getAvatarRequest().then((r) => (status = r));

    if (status !== 'SUCCESS') {
      toastr.error('An error has occurred while trying getting avatar');
    }
  };

  useEffect(() => {
    const userSesion = JSON.parse(localStorage.getItem('sesion'));
    setSesion(userSesion);

    if (userSesion.user.avatarParts !== undefined)
      for (let i = 0; i < userSesion.user.avatarParts.length; i += 1)
        handleChange(userSesion.user.avatarParts[i].type, userSesion.user.avatarParts[i]);

    if (!props.avatar) {
      getAvatar();
    }

    // eslint-disable-next-line
  }, []);

  if (sesion)
    return (
      <main className={classes.content}>
        {props.avatar_charging ? (
          <Spinner />
        ) : (
          <>
            {' '}
            <div className={classes.appBarSpacer} />
            <div className="avatar-page-wrapper">
              <div className="avatar-custom-control">
                <CustomAvatar
                  clothes={
                    AvatarParts.clothes !== undefined
                      ? AvatarParts.skins.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.clothes.image}`
                        : AvatarParts.clothes.image
                      : null
                  }
                  skin={
                    AvatarParts.skins !== undefined
                      ? AvatarParts.skins.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.skins.image}`
                        : AvatarParts.skins.image
                      : null
                  }
                  hat={
                    AvatarParts.hats !== undefined
                      ? AvatarParts.hats.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.hats.image}`
                        : AvatarParts.hats.image
                      : null
                  }
                  mouth={
                    AvatarParts.mouths !== undefined
                      ? AvatarParts.mouths.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.mouths.image}`
                        : AvatarParts.mouths.image
                      : null
                  }
                  eyes={
                    AvatarParts.eyes !== undefined
                      ? AvatarParts.eyes.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.eyes.image}`
                        : AvatarParts.eyes.image
                      : null
                  }
                  nose={
                    AvatarParts.noses !== undefined
                      ? AvatarParts.noses.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.noses.image}`
                        : AvatarParts.noses.image
                      : null
                  }
                  hair={
                    AvatarParts.hairs !== undefined
                      ? AvatarParts.hairs.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.hairs.image}`
                        : AvatarParts.hairs.image
                      : null
                  }
                  accessory={
                    AvatarParts.accessories !== undefined
                      ? AvatarParts.accessories.id !== null
                        ? `${enviroment.motivarnosBackend}${AvatarParts.accessories.image}`
                        : AvatarParts.accessories.image
                      : null
                  }
                />
                <div className="avatar-items-control">
                  <ul>
                    <li
                      className={`pointer ${partSelected === 'SKIN' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('SKIN')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuBody} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'EYE' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('EYE')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuEyes} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'MOUTH' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('MOUTH')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuMouth} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'BODY' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('BODY')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuClothes} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'NOSE' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('NOSE')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuNose} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'HAIR' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('HAIR')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuHair} alt="" />
                    </li>
                    <li
                      className={`pointer ${partSelected === 'ACCESSORY' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('ACCESSORY')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuAccessories} alt="" />
                    </li>

                    <li
                      className={`pointer ${partSelected === 'HAT' ? ' part-active' : ''}`}
                      onClick={() => handleChangePart('HAT')}
                      onKeyDown={() => {}}
                      role="presentation"
                    >
                      <img src={menuHat} alt="" />
                    </li>
                  </ul>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      mergeAvatar(
                        [
                          AvatarParts.skins !== undefined
                            ? AvatarParts.skins.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.skins.image}`
                              : AvatarParts.skins.image
                            : undefined,
                          AvatarParts.clothes !== undefined
                            ? AvatarParts.skins.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.clothes.image}`
                              : AvatarParts.clothes.image
                            : undefined,
                          AvatarParts.mouths !== undefined
                            ? AvatarParts.mouths.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.mouths.image}`
                              : AvatarParts.mouths.image
                            : undefined,
                          AvatarParts.eyes !== undefined
                            ? AvatarParts.eyes.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.eyes.image}`
                              : AvatarParts.eyes.image
                            : undefined,
                          AvatarParts.noses !== undefined
                            ? AvatarParts.noses.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.noses.image}`
                              : AvatarParts.noses.image
                            : undefined,
                          AvatarParts.hairs !== undefined
                            ? AvatarParts.hairs.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.hairs.image}`
                              : AvatarParts.hairs.image
                            : undefined,
                          AvatarParts.accessories !== undefined
                            ? AvatarParts.accessories.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.accessories.image}`
                              : AvatarParts.accessories.image
                            : undefined,
                          AvatarParts.hats !== undefined
                            ? AvatarParts.hats.id !== null
                              ? `${enviroment.motivarnosBackend}${AvatarParts.hats.image}`
                              : AvatarParts.hats.image
                            : undefined
                        ],
                        (data) => {
                          const auxParts = [
                            AvatarParts.skins,
                            AvatarParts.clothes,
                            AvatarParts.mouths,
                            AvatarParts.eyes,
                            AvatarParts.noses,
                            AvatarParts.hairs,
                            AvatarParts.accessories,
                            AvatarParts.hats
                          ];
                          updateUser({
                            id: sesion.user.id,
                            image: data,
                            avatarParts: [
                              ...auxParts
                                .filter((value) => value !== undefined && value.id !== null)
                                .map((value) => ({ id: value.id }))
                            ]
                          });
                        }
                      );
                    }}
                  >
                    {t('confirm.label')}
                  </Button>
                </div>
              </div>
              <div className="parts-items-container">
                {props.avatar === null || props.avatar === 'undefined' ? (
                  ''
                ) : (
                  <ul className="avatar-parts-container">
                    {[...props.avatar].map((data, index) => {
                      if (data.type === partSelected || data.type === '')
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              handleChange(partSelected, data);
                            }}
                            style={{
                              filter: 'saturate(1)'
                            }}
                            onKeyDown={() => {}}
                            role="presentation"
                          >
                            <span className="avatar-part">
                              {data.image.includes('/media/') ? (
                                <img src={data.image} alt="" />
                              ) : (
                                <img src={`${enviroment.motivarnosBackend}${data.image}`} alt="" />
                              )}
                            </span>
                            {!data.isFree && !data.isMine ? (
                              <span className="price">
                                <span className="money">
                                  <img src={money} alt="" />
                                </span>
                                <span>{data.coins}</span>
                              </span>
                            ) : (
                              ''
                            )}
                          </li>
                        );
                      return null;
                    })}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    );
  return '';
};

const mapStateToProps = ({ avatarsReducer }) => avatarsReducer;

const mapDispatchToProps = {
  getAvatarRequest,
  saveAvatarRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
