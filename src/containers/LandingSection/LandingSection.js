import React, { useState } from "react";
import "./LandingSection.css";

import NavBar from "../NavBar/NavBar";
import LandingPage from "assets/images/landingPage.jpg";
import { TextField } from "@material-ui/core";
import Button from "components/UI/Button/Button";
import DarkComponent from "components/UI/DarkComponent/DarkComponent";
import FAQComponent from "components/UI/FAQComponent/FAQComponent";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { texualMaterial } from './LandingSectionTexts'


const LandingSection = props => {
    const [faqBoxOpen, setFaqBoxOpen] = useState({});

    const faqOpenHandler = boxNumber => {
        setFaqBoxOpen(prevBoxState => ({
            [boxNumber]: !prevBoxState[boxNumber]
        }));
    };

    const darkComponents = texualMaterial.darkComponent.map(darkcomp => (
        <div className="tv-section" key={darkcomp.id}>
            <div className="responsive-tv-inner">
                <DarkComponent
                    topText={darkcomp.topText}
                    bottomText={darkcomp.bottomText}
                    image={darkcomp.image}
                />
            </div>
        </div>
    ))

    const faqComponents = texualMaterial.faqComponent.map(faqcomp => (
        <FAQComponent
            key={faqcomp.id}
            text={faqcomp.text}
            boxOpen={faqBoxOpen[`box${faqcomp.id}`]}
            faqOpenHandler={() => faqOpenHandler(`box${faqcomp.id}`)}
            boxText={faqcomp.boxText}
        />
    ))

    return (
        <>
            <div
                className="landingSection"
                style={{ backgroundImage: `url(${LandingPage})` }}
            >
                <NavBar loginButton />
                <div className="landingTexts">
                    <h1>
Filmes, séries e muito mais, sem limites.</h1>
                    <h3>Assista onde quiser. Cancele quando quiser.

.</h3>
                    <h3>
                    Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.

                     </h3>

                    <div className="ButtonSticker">
                        <TextField
                            className="TextField"
                            label="Email"
                            variant="filled"
                            color="secondary"
                            
                        />

                        <Link to="/login">
                            <Button
                                height="56px"
                                width="150px"
                                image
                                icon={faChevronRight}
                                backgroundColor="red"
                                textColor="#fff"
                                buttonSize="xs"
                            >
                                Vamos Lá
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {darkComponents}

            <div className="faq-section">
                <div className="tv-inner">
                    <DarkComponent
                        fontSize="2.5rem"
                        topText="Perguntas frequentes

                        "
                    />

                    {faqComponents}

                    <div className="GetStartedComponent">
                        <h3>
                            Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.

                        </h3>

                        <div className="ButtonSticker">
                            <TextField
                                className="TextField"
                                label="Email "
                                variant="filled"
                                color="secondary"
                            />

                            <Link to="/login">
                                <Button
                                    height="56px"
                                    width="150px"
                                    image
                                    icon={faChevronRight}
                                    backgroundColor="#e50914"
                                    fontSize="1.5rem"
                                    textColor="#ffff"
                                    buttonSize="xs"
                                >
                                    Vamos lá!
                             </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingSection;
