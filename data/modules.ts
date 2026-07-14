import { PrismeModule } from '@/types/prisme';

export const modules: PrismeModule[] = [
  {
    "id": "personnalite",
    "title": "Personnalité",
    "subtitle": "Sens, créativité et profondeur",
    "description": "Explore ce qui guide tes choix et ton style de pensée.",
    "questions": [
      {
        "id": "p1",
        "moduleId": "personnalite",
        "scene": "Une journée totalement libre s’ouvre devant toi.",
        "prompt": "Que fais-tu le plus naturellement ?",
        "options": [
          {
            "text": "Je structure rapidement ma journée.",
            "scores": {
              "structure": 2,
              "execution": 1
            }
          },
          {
            "text": "Je suis mon envie du moment.",
            "scores": {
              "flexibility": 2,
              "novelty": 1
            }
          },
          {
            "text": "Je commence un projet qui me passionne.",
            "scores": {
              "creativity": 2,
              "meaning": 2
            }
          },
          {
            "text": "Je risque de me perdre sur mon téléphone.",
            "scores": {
              "avoidance": 2,
              "execution": -1
            }
          }
        ]
      },
      {
        "id": "p2",
        "moduleId": "personnalite",
        "scene": "Une musique te bouleverse.",
        "prompt": "Que se passe-t-il ensuite ?",
        "options": [
          {
            "text": "Je l’apprécie puis je passe à autre chose.",
            "scores": {
              "sensitivity": -1
            }
          },
          {
            "text": "J’y pense encore plusieurs heures.",
            "scores": {
              "sensitivity": 1,
              "rumination": 1
            }
          },
          {
            "text": "Elle fait naître des images et des idées.",
            "scores": {
              "creativity": 2,
              "symbolic": 2
            }
          },
          {
            "text": "Elle transforme ma vision du monde.",
            "scores": {
              "meaning": 2,
              "sensitivity": 2,
              "symbolic": 1
            }
          }
        ]
      },
      {
        "id": "p3",
        "moduleId": "personnalite",
        "scene": "Une conversation reste très superficielle.",
        "prompt": "Tu te sens…",
        "options": [
          {
            "text": "Très bien, cela peut être agréable.",
            "scores": {
              "depth": -1,
              "social": 1
            }
          },
          {
            "text": "Un peu ennuyé.",
            "scores": {
              "depth": 1
            }
          },
          {
            "text": "Rapidement déconnecté.",
            "scores": {
              "depth": 2,
              "social": -1
            }
          },
          {
            "text": "Tenté d’amener la discussion plus loin.",
            "scores": {
              "depth": 2,
              "meaning": 1
            }
          }
        ]
      },
      {
        "id": "p4",
        "moduleId": "personnalite",
        "scene": "Tu dois prendre une décision importante.",
        "prompt": "Tu te fies surtout…",
        "options": [
          {
            "text": "Aux faits.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "À ton intuition.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "À un mélange des deux.",
            "scores": {
              "analysis": 1,
              "symbolic": 1
            }
          },
          {
            "text": "À l’avis des autres.",
            "scores": {
              "attachment": 1,
              "anxiety": 1
            }
          }
        ]
      },
      {
        "id": "p5",
        "moduleId": "personnalite",
        "scene": "Cette phrase te ressemble-t-elle ?",
        "prompt": "« Mon monde intérieur est souvent plus riche que ce que les autres perçoivent. »",
        "options": [
          {
            "text": "Pas vraiment.",
            "scores": {
              "innerWorld": -2
            }
          },
          {
            "text": "Un peu.",
            "scores": {
              "innerWorld": 1
            }
          },
          {
            "text": "Beaucoup.",
            "scores": {
              "innerWorld": 2,
              "depth": 1
            }
          },
          {
            "text": "Profondément.",
            "scores": {
              "innerWorld": 3,
              "symbolic": 1
            }
          }
        ]
      },
      {
        "id": "p6",
        "moduleId": "personnalite",
        "scene": "On te propose une vie confortable mais peu stimulante.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Acceptes volontiers.",
            "scores": {
              "stability": 2
            }
          },
          {
            "text": "Hésites.",
            "scores": {
              "stability": 1,
              "meaning": 1
            }
          },
          {
            "text": "Cherches autre chose.",
            "scores": {
              "meaning": 2,
              "novelty": 1
            }
          },
          {
            "text": "Préfères l’incertitude si elle a du sens.",
            "scores": {
              "meaning": 3,
              "riskTolerance": 1
            }
          }
        ]
      },
      {
        "id": "p7",
        "moduleId": "personnalite",
        "scene": "Tu rencontres une idée nouvelle.",
        "prompt": "Ta réaction spontanée ?",
        "options": [
          {
            "text": "Je la compare aux faits.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Je cherche ce qu’elle révèle.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Je vois immédiatement plusieurs applications.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Je garde une distance prudente.",
            "scores": {
              "caution": 2
            }
          }
        ]
      },
      {
        "id": "p8",
        "moduleId": "personnalite",
        "scene": "Quand tu expliques quelque chose de complexe…",
        "prompt": "Tu utilises surtout…",
        "options": [
          {
            "text": "Une structure logique.",
            "scores": {
              "analysis": 2,
              "structure": 1
            }
          },
          {
            "text": "Des exemples concrets.",
            "scores": {
              "practicality": 2
            }
          },
          {
            "text": "Des métaphores.",
            "scores": {
              "symbolic": 2,
              "creativity": 1
            }
          },
          {
            "text": "Plusieurs détours avant de revenir au centre.",
            "scores": {
              "divergence": 2
            }
          }
        ]
      },
      {
        "id": "p9",
        "moduleId": "personnalite",
        "scene": "Tu dois choisir entre efficacité et beauté.",
        "prompt": "Tu privilégies…",
        "options": [
          {
            "text": "L’efficacité.",
            "scores": {
              "practicality": 2
            }
          },
          {
            "text": "La beauté.",
            "scores": {
              "aesthetic": 2
            }
          },
          {
            "text": "Un équilibre entre les deux.",
            "scores": {
              "practicality": 1,
              "aesthetic": 1
            }
          },
          {
            "text": "Cela dépend du sens du projet.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "p10",
        "moduleId": "personnalite",
        "scene": "Quel mot te guide le plus actuellement ?",
        "prompt": "Choisis spontanément.",
        "options": [
          {
            "text": "Réussir.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Comprendre.",
            "scores": {
              "analysis": 2,
              "meaning": 1
            }
          },
          {
            "text": "Aimer.",
            "scores": {
              "attachment": 2,
              "empathy": 1
            }
          },
          {
            "text": "Être fidèle à ce qui a du sens.",
            "scores": {
              "meaning": 3
            }
          }
        ]
      },
      {
        "id": "p11",
        "moduleId": "personnalite",
        "scene": "On te donne carte blanche sur un projet.",
        "prompt": "Tu commences par…",
        "options": [
          {
            "text": "Définir le résultat attendu.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Explorer librement.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Chercher une intention profonde.",
            "scores": {
              "meaning": 2
            }
          },
          {
            "text": "Observer ce qui existe déjà.",
            "scores": {
              "analysis": 1
            }
          }
        ]
      },
      {
        "id": "p12",
        "moduleId": "personnalite",
        "scene": "Tu dois choisir un environnement de travail.",
        "prompt": "Tu préfères…",
        "options": [
          {
            "text": "Très cadré.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Très autonome.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "Stimulant et varié.",
            "scores": {
              "novelty": 2
            }
          },
          {
            "text": "Calme et inspirant.",
            "scores": {
              "sensitivity": 1,
              "creativity": 1
            }
          }
        ]
      },
      {
        "id": "p13",
        "moduleId": "personnalite",
        "scene": "Quand tu changes d’avis…",
        "prompt": "C’est souvent parce que…",
        "options": [
          {
            "text": "Les faits ont changé.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Mon ressenti a évolué.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "J’ai compris quelque chose de plus profond.",
            "scores": {
              "meaning": 2
            }
          },
          {
            "text": "Une autre possibilité est apparue.",
            "scores": {
              "divergence": 2
            }
          }
        ]
      },
      {
        "id": "p14",
        "moduleId": "personnalite",
        "scene": "Dans une équipe…",
        "prompt": "Tu apportes surtout…",
        "options": [
          {
            "text": "De la structure.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Des idées.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "De la cohésion.",
            "scores": {
              "empathy": 2
            }
          },
          {
            "text": "Une vision d’ensemble.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "p15",
        "moduleId": "personnalite",
        "scene": "Quand tu admires quelqu’un…",
        "prompt": "Tu admires surtout…",
        "options": [
          {
            "text": "Sa réussite.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Son courage.",
            "scores": {
              "values": 2
            }
          },
          {
            "text": "Sa sensibilité.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "Sa vision.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "p16",
        "moduleId": "personnalite",
        "scene": "Une règle te paraît absurde.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La respectes quand même.",
            "scores": {
              "conformity": 2
            }
          },
          {
            "text": "La questionnes.",
            "scores": {
              "analysis": 1,
              "independence": 1
            }
          },
          {
            "text": "La contournes.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "Cherches son intention initiale.",
            "scores": {
              "meaning": 1,
              "analysis": 1
            }
          }
        ]
      },
      {
        "id": "p17",
        "moduleId": "personnalite",
        "scene": "Tu dois choisir entre cohérence et spontanéité.",
        "prompt": "Tu privilégies…",
        "options": [
          {
            "text": "La cohérence.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "La spontanéité.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "Un équilibre.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Cela dépend du sens.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "p18",
        "moduleId": "personnalite",
        "scene": "Quand une idée te ressemble profondément…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La gardes pour toi.",
            "scores": {
              "introversion": 1
            }
          },
          {
            "text": "La partages.",
            "scores": {
              "social": 1
            }
          },
          {
            "text": "La transformes en projet.",
            "scores": {
              "execution": 1,
              "creativity": 1
            }
          },
          {
            "text": "La laisses mûrir longtemps.",
            "scores": {
              "innerWorld": 2
            }
          }
        ]
      },
      {
        "id": "p19",
        "moduleId": "personnalite",
        "scene": "Tu es plus satisfait quand…",
        "prompt": "Tu as…",
        "options": [
          {
            "text": "Terminé quelque chose.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Compris quelque chose.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Créé quelque chose.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Vécu quelque chose de vrai.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      }
    ]
  },
  {
    "id": "attention",
    "title": "Attention",
    "subtitle": "Fonctions exécutives et TDAH exploratoire",
    "description": "Explore stabilité attentionnelle, impulsivité et mise en action.",
    "questions": [
      {
        "id": "a1",
        "moduleId": "attention",
        "scene": "Tu écoutes une explication longue et peu stimulante.",
        "prompt": "Que se passe-t-il le plus souvent ?",
        "options": [
          {
            "text": "Je reste concentré jusqu’au bout.",
            "scores": {
              "adhdAttention": -2,
              "attentionControl": 2
            }
          },
          {
            "text": "Mon esprit décroche un peu, puis je reviens.",
            "scores": {
              "adhdAttention": 1,
              "attentionControl": 1
            }
          },
          {
            "text": "Je perds souvent le fil.",
            "scores": {
              "adhdAttention": 2,
              "attentionControl": -1
            }
          },
          {
            "text": "Cela dépend presque entièrement de mon intérêt.",
            "scores": {
              "adhdAttention": 1,
              "attentionVariability": 2
            }
          }
        ]
      },
      {
        "id": "a2",
        "moduleId": "attention",
        "scene": "Tu as trois choses importantes à faire aujourd’hui.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Les hiérarchises naturellement.",
            "scores": {
              "executiveDifficulty": -2,
              "planning": 2
            }
          },
          {
            "text": "Commences par la plus urgente.",
            "scores": {
              "executiveDifficulty": -1,
              "planning": 1
            }
          },
          {
            "text": "Hésites longtemps avant de commencer.",
            "scores": {
              "executiveDifficulty": 2,
              "anxiety": 1
            }
          },
          {
            "text": "En commences plusieurs à la fois.",
            "scores": {
              "executiveDifficulty": 2,
              "impulsivity": 1
            }
          }
        ]
      },
      {
        "id": "a3",
        "moduleId": "attention",
        "scene": "Quand tu étais enfant ou adolescent…",
        "prompt": "Que te reprochait-on le plus ?",
        "options": [
          {
            "text": "Rien de particulier.",
            "scores": {
              "childhoodAdhd": -2
            }
          },
          {
            "text": "D’être dans la lune.",
            "scores": {
              "childhoodAdhd": 2
            }
          },
          {
            "text": "De ne pas exploiter mes capacités.",
            "scores": {
              "childhoodAdhd": 1,
              "motivationVariability": 1
            }
          },
          {
            "text": "D’être désorganisé ou oublieux.",
            "scores": {
              "childhoodAdhd": 2,
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "a4",
        "moduleId": "attention",
        "scene": "Clés, portefeuille, téléphone, papiers…",
        "prompt": "Tu les égares…",
        "options": [
          {
            "text": "Presque jamais.",
            "scores": {
              "adhdAttention": -2,
              "workingMemory": 2
            }
          },
          {
            "text": "De temps en temps.",
            "scores": {
              "adhdAttention": 0
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "adhdAttention": 2,
              "workingMemory": -1
            }
          },
          {
            "text": "Très souvent.",
            "scores": {
              "adhdAttention": 3,
              "workingMemory": -2
            }
          }
        ]
      },
      {
        "id": "a5",
        "moduleId": "attention",
        "scene": "Une tâche n’a aucun intérêt personnel.",
        "prompt": "Ta motivation…",
        "options": [
          {
            "text": "Reste correcte si elle est nécessaire.",
            "scores": {
              "motivationVariability": -2,
              "execution": 2
            }
          },
          {
            "text": "Baisse un peu.",
            "scores": {
              "motivationVariability": 1
            }
          },
          {
            "text": "S’effondre vite.",
            "scores": {
              "motivationVariability": 2,
              "executiveDifficulty": 1
            }
          },
          {
            "text": "Revient seulement sous pression.",
            "scores": {
              "motivationVariability": 2,
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "a6",
        "moduleId": "attention",
        "scene": "Ton téléphone vibre pendant une tâche importante.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’ignores.",
            "scores": {
              "attentionControl": 2
            }
          },
          {
            "text": "Regardes puis reprends facilement.",
            "scores": {
              "attentionControl": 1
            }
          },
          {
            "text": "Te retrouves parfois absorbé ailleurs.",
            "scores": {
              "adhdAttention": 2,
              "avoidance": 1
            }
          },
          {
            "text": "Cela dépend totalement de l’intérêt de la tâche.",
            "scores": {
              "attentionVariability": 2
            }
          }
        ]
      },
      {
        "id": "a7",
        "moduleId": "attention",
        "scene": "Une idée soudaine apparaît pendant que tu travailles.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La notes puis continues.",
            "scores": {
              "planning": 2,
              "impulsivity": -1
            }
          },
          {
            "text": "Y penses en arrière-plan.",
            "scores": {
              "workingMemory": 1
            }
          },
          {
            "text": "Abandonnes parfois ce que tu fais.",
            "scores": {
              "impulsivity": 2
            }
          },
          {
            "text": "Construis immédiatement tout un projet autour.",
            "scores": {
              "impulsivity": 1,
              "creativity": 2
            }
          }
        ]
      },
      {
        "id": "a8",
        "moduleId": "attention",
        "scene": "Quand tu lis un livre passionnant…",
        "prompt": "Ton attention…",
        "options": [
          {
            "text": "Reste stable.",
            "scores": {
              "attentionControl": 2
            }
          },
          {
            "text": "Fluctue un peu.",
            "scores": {
              "adhdAttention": 1
            }
          },
          {
            "text": "Peut devenir très intense.",
            "scores": {
              "attentionVariability": 2
            }
          },
          {
            "text": "Varie énormément selon les jours.",
            "scores": {
              "attentionVariability": 3
            }
          }
        ]
      },
      {
        "id": "a9",
        "moduleId": "attention",
        "scene": "Tu dois rester assis longtemps sans activité.",
        "prompt": "Tu ressens…",
        "options": [
          {
            "text": "Peu de gêne.",
            "scores": {
              "hyperactivity": -2
            }
          },
          {
            "text": "Une légère impatience.",
            "scores": {
              "hyperactivity": 1
            }
          },
          {
            "text": "Une agitation physique.",
            "scores": {
              "hyperactivity": 2
            }
          },
          {
            "text": "Surtout une agitation mentale.",
            "scores": {
              "innerRestlessness": 2
            }
          }
        ]
      },
      {
        "id": "a10",
        "moduleId": "attention",
        "scene": "Tu dois reprendre une tâche interrompue.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Retrouves facilement le fil.",
            "scores": {
              "workingMemory": 2
            }
          },
          {
            "text": "As besoin d’un court moment.",
            "scores": {
              "workingMemory": 1
            }
          },
          {
            "text": "Peines à retrouver l’élan.",
            "scores": {
              "executiveDifficulty": 1
            }
          },
          {
            "text": "Abandonnes parfois.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "a11",
        "moduleId": "attention",
        "scene": "Une consigne comporte beaucoup d’étapes.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La suis facilement.",
            "scores": {
              "workingMemory": 2
            }
          },
          {
            "text": "Prends des notes.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "En oublies parfois une partie.",
            "scores": {
              "executiveDifficulty": 1
            }
          },
          {
            "text": "Te sens vite saturé.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "a12",
        "moduleId": "attention",
        "scene": "Quand tu fais une tâche répétitive…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Restes précis.",
            "scores": {
              "attentionControl": 2
            }
          },
          {
            "text": "Te déconcentres un peu.",
            "scores": {
              "adhdAttention": 1
            }
          },
          {
            "text": "Fais des erreurs d’inattention.",
            "scores": {
              "adhdAttention": 2
            }
          },
          {
            "text": "Cherches à la rendre plus stimulante.",
            "scores": {
              "motivationVariability": 2
            }
          }
        ]
      },
      {
        "id": "a13",
        "moduleId": "attention",
        "scene": "Tu dois estimer le temps nécessaire.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Évalues assez juste.",
            "scores": {
              "timeManagement": 2
            }
          },
          {
            "text": "Sous-estimes parfois.",
            "scores": {
              "timeManagement": -1
            }
          },
          {
            "text": "Sous-estimes souvent.",
            "scores": {
              "timeManagement": -2
            }
          },
          {
            "text": "N’y penses pas vraiment.",
            "scores": {
              "planning": -1
            }
          }
        ]
      },
      {
        "id": "a14",
        "moduleId": "attention",
        "scene": "Quand plusieurs personnes parlent…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Suis le fil principal.",
            "scores": {
              "attentionControl": 2
            }
          },
          {
            "text": "Passes d’une voix à l’autre.",
            "scores": {
              "adhdAttention": 1
            }
          },
          {
            "text": "Perds le fil.",
            "scores": {
              "adhdAttention": 2
            }
          },
          {
            "text": "Te fatigues vite.",
            "scores": {
              "sensorySensitivity": 2
            }
          }
        ]
      },
      {
        "id": "a15",
        "moduleId": "attention",
        "scene": "Tu commences une tâche difficile.",
        "prompt": "Le plus dur est…",
        "options": [
          {
            "text": "Rien de particulier.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Comprendre comment faire.",
            "scores": {
              "planning": 1
            }
          },
          {
            "text": "Commencer.",
            "scores": {
              "executiveDifficulty": 2
            }
          },
          {
            "text": "Rester dessus.",
            "scores": {
              "adhdAttention": 2
            }
          }
        ]
      },
      {
        "id": "a16",
        "moduleId": "attention",
        "scene": "Quand tu oublies quelque chose…",
        "prompt": "C’est souvent…",
        "options": [
          {
            "text": "Rare.",
            "scores": {
              "workingMemory": 2
            }
          },
          {
            "text": "Parce que j’étais préoccupé.",
            "scores": {
              "anxiety": 1
            }
          },
          {
            "text": "Parce que je pensais à autre chose.",
            "scores": {
              "adhdAttention": 2
            }
          },
          {
            "text": "Parce que je n’avais pas de système.",
            "scores": {
              "planning": -1
            }
          }
        ]
      },
      {
        "id": "a17",
        "moduleId": "attention",
        "scene": "Une échéance est lointaine.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Avances régulièrement.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "Commences plus tard.",
            "scores": {
              "executiveDifficulty": 1
            }
          },
          {
            "text": "Attends la pression.",
            "scores": {
              "executiveDifficulty": 2
            }
          },
          {
            "text": "Oublies jusqu’à un rappel.",
            "scores": {
              "workingMemory": -2
            }
          }
        ]
      },
      {
        "id": "a18",
        "moduleId": "attention",
        "scene": "Tu dois passer d’une tâche à une autre.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Bascules facilement.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "As besoin d’un court temps.",
            "scores": {
              "flexibility": 1
            }
          },
          {
            "text": "Restes mentalement sur la précédente.",
            "scores": {
              "attentionVariability": 1
            }
          },
          {
            "text": "Perds beaucoup d’énergie.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "a19",
        "moduleId": "attention",
        "scene": "Quand tu es passionné…",
        "prompt": "Tu peux…",
        "options": [
          {
            "text": "Rester concentré longtemps.",
            "scores": {
              "attentionControl": 1
            }
          },
          {
            "text": "Oublier l’heure.",
            "scores": {
              "attentionVariability": 2
            }
          },
          {
            "text": "Négliger les pauses.",
            "scores": {
              "attentionVariability": 2
            }
          },
          {
            "text": "Devenir difficile à interrompre.",
            "scores": {
              "attentionVariability": 2
            }
          }
        ]
      }
    ]
  },
  {
    "id": "emotions",
    "title": "Émotions",
    "subtitle": "Anxiété, rumination et régulation",
    "description": "Explore la manière dont les émotions se prolongent ou freinent l’action.",
    "questions": [
      {
        "id": "e1",
        "moduleId": "emotions",
        "scene": "Un appel ou un rendez-vous important approche.",
        "prompt": "Ton esprit…",
        "options": [
          {
            "text": "Reste plutôt calme.",
            "scores": {
              "anxiety": -2
            }
          },
          {
            "text": "Anticipe un peu.",
            "scores": {
              "anxiety": 1
            }
          },
          {
            "text": "Prépare plusieurs scénarios.",
            "scores": {
              "anxiety": 2,
              "rumination": 1
            }
          },
          {
            "text": "Peut repousser l’action par stress.",
            "scores": {
              "anxiety": 2,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "id": "e2",
        "moduleId": "emotions",
        "scene": "Quelqu’un semble plus froid que d’habitude.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "N’y accordes pas trop d’importance.",
            "scores": {
              "rejectionSensitivity": -2
            }
          },
          {
            "text": "Te demandes brièvement pourquoi.",
            "scores": {
              "rejectionSensitivity": 1
            }
          },
          {
            "text": "Crains d’avoir fait quelque chose.",
            "scores": {
              "rejectionSensitivity": 2
            }
          },
          {
            "text": "Repenses longtemps à la relation.",
            "scores": {
              "rejectionSensitivity": 2,
              "rumination": 2
            }
          }
        ]
      },
      {
        "id": "e3",
        "moduleId": "emotions",
        "scene": "Quand tu te sens vide…",
        "prompt": "Tu as tendance à…",
        "options": [
          {
            "text": "Te reposer.",
            "scores": {
              "emotionalRegulation": 1
            }
          },
          {
            "text": "Chercher du soutien.",
            "scores": {
              "socialSupport": 2
            }
          },
          {
            "text": "Te réfugier dans les écrans.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "Ne plus avoir envie de grand-chose.",
            "scores": {
              "lowMood": 2
            }
          }
        ]
      },
      {
        "id": "e4",
        "moduleId": "emotions",
        "scene": "Au moment de dormir…",
        "prompt": "Ton cerveau…",
        "options": [
          {
            "text": "S’apaise facilement.",
            "scores": {
              "anxiety": -1,
              "innerRestlessness": -1
            }
          },
          {
            "text": "Tourne encore un peu.",
            "scores": {
              "innerRestlessness": 1
            }
          },
          {
            "text": "Continue à analyser la journée.",
            "scores": {
              "rumination": 2
            }
          },
          {
            "text": "S’emballe en idées ou scénarios.",
            "scores": {
              "innerRestlessness": 2,
              "activation": 1
            }
          }
        ]
      },
      {
        "id": "e5",
        "moduleId": "emotions",
        "scene": "Tu veux terminer quelque chose d’important.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Acceptes facilement que ce soit imparfait.",
            "scores": {
              "perfectionism": -2
            }
          },
          {
            "text": "Cherches un bon niveau sans te bloquer.",
            "scores": {
              "perfectionism": 0
            }
          },
          {
            "text": "Peux retarder la fin pour améliorer encore.",
            "scores": {
              "perfectionism": 2
            }
          },
          {
            "text": "Peux éviter de montrer le résultat.",
            "scores": {
              "perfectionism": 2,
              "anxiety": 1
            }
          }
        ]
      },
      {
        "id": "e6",
        "moduleId": "emotions",
        "scene": "Après une critique injuste…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Passes vite à autre chose.",
            "scores": {
              "rumination": -2
            }
          },
          {
            "text": "Y repenses un peu.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "Analyses longuement la scène.",
            "scores": {
              "rumination": 2,
              "analysis": 1
            }
          },
          {
            "text": "Remets en question la relation.",
            "scores": {
              "rejectionSensitivity": 2
            }
          }
        ]
      },
      {
        "id": "e7",
        "moduleId": "emotions",
        "scene": "Une émotion forte arrive.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’exprimes.",
            "scores": {
              "emotionalRegulation": 1
            }
          },
          {
            "text": "La gardes à l’intérieur.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "La transformes en création.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Cherches ce qu’elle révèle.",
            "scores": {
              "analysis": 2
            }
          }
        ]
      },
      {
        "id": "e8",
        "moduleId": "emotions",
        "scene": "Sur plusieurs semaines…",
        "prompt": "Ton énergie est…",
        "options": [
          {
            "text": "Assez stable.",
            "scores": {
              "moodVariability": -2
            }
          },
          {
            "text": "Un peu variable.",
            "scores": {
              "moodVariability": 1
            }
          },
          {
            "text": "Très fluctuante.",
            "scores": {
              "moodVariability": 2
            }
          },
          {
            "text": "Par vagues très marquées.",
            "scores": {
              "moodVariability": 3
            }
          }
        ]
      },
      {
        "id": "e9",
        "moduleId": "emotions",
        "scene": "Quand tu es débordé émotionnellement…",
        "prompt": "Tu préfères…",
        "options": [
          {
            "text": "Agir.",
            "scores": {
              "copingAction": 2
            }
          },
          {
            "text": "Parler.",
            "scores": {
              "socialSupport": 2
            }
          },
          {
            "text": "T’isoler.",
            "scores": {
              "withdrawal": 2
            }
          },
          {
            "text": "Te distraire.",
            "scores": {
              "avoidance": 2
            }
          }
        ]
      },
      {
        "id": "e10",
        "moduleId": "emotions",
        "scene": "Tu commets une erreur importante.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’acceptes.",
            "scores": {
              "selfCompassion": 2
            }
          },
          {
            "text": "Cherches à comprendre.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "T’en veux longtemps.",
            "scores": {
              "rumination": 2
            }
          },
          {
            "text": "Crains le jugement.",
            "scores": {
              "anxiety": 1,
              "rejectionSensitivity": 1
            }
          }
        ]
      },
      {
        "id": "e11",
        "moduleId": "emotions",
        "scene": "Quand une émotion monte…",
        "prompt": "Tu la repères…",
        "options": [
          {
            "text": "Très vite.",
            "scores": {
              "interoception": 2
            }
          },
          {
            "text": "Assez vite.",
            "scores": {
              "interoception": 1
            }
          },
          {
            "text": "Après un moment.",
            "scores": {
              "interoception": -1
            }
          },
          {
            "text": "Seulement quand elle déborde.",
            "scores": {
              "interoception": -2
            }
          }
        ]
      },
      {
        "id": "e12",
        "moduleId": "emotions",
        "scene": "Quand tu es triste…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Cherches du soutien.",
            "scores": {
              "socialSupport": 2
            }
          },
          {
            "text": "T’isoles.",
            "scores": {
              "withdrawal": 2
            }
          },
          {
            "text": "Crées.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Analyses.",
            "scores": {
              "rumination": 1,
              "analysis": 1
            }
          }
        ]
      },
      {
        "id": "e13",
        "moduleId": "emotions",
        "scene": "Quand tu es en colère…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’exprimes clairement.",
            "scores": {
              "assertiveness": 2
            }
          },
          {
            "text": "La retiens.",
            "scores": {
              "suppression": 2
            }
          },
          {
            "text": "Exploses parfois.",
            "scores": {
              "impulsivity": 2
            }
          },
          {
            "text": "La transformes en décision.",
            "scores": {
              "execution": 1
            }
          }
        ]
      },
      {
        "id": "e14",
        "moduleId": "emotions",
        "scene": "Une mauvaise nouvelle arrive.",
        "prompt": "Ton corps…",
        "options": [
          {
            "text": "Réagit peu.",
            "scores": {
              "anxiety": -1
            }
          },
          {
            "text": "Se tend.",
            "scores": {
              "anxiety": 1
            }
          },
          {
            "text": "S’emballe.",
            "scores": {
              "anxiety": 2
            }
          },
          {
            "text": "Se fige.",
            "scores": {
              "withdrawal": 1,
              "anxiety": 2
            }
          }
        ]
      },
      {
        "id": "e15",
        "moduleId": "emotions",
        "scene": "Tu repenses à un moment heureux.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Souris puis passes à autre chose.",
            "scores": {
              "sensitivity": 0
            }
          },
          {
            "text": "Le revis émotionnellement.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "L’idéalises.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "En fais une source d’inspiration.",
            "scores": {
              "creativity": 2
            }
          }
        ]
      },
      {
        "id": "e16",
        "moduleId": "emotions",
        "scene": "Quand tu vas mal…",
        "prompt": "Tu sais généralement pourquoi ?",
        "options": [
          {
            "text": "Oui.",
            "scores": {
              "interoception": 2
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "interoception": 1
            }
          },
          {
            "text": "Pas toujours.",
            "scores": {
              "interoception": -1
            }
          },
          {
            "text": "Rarement.",
            "scores": {
              "interoception": -2
            }
          }
        ]
      },
      {
        "id": "e17",
        "moduleId": "emotions",
        "scene": "Une période de stress dure plusieurs jours.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "T’adaptes.",
            "scores": {
              "resilience": 2
            }
          },
          {
            "text": "Tiens puis récupères.",
            "scores": {
              "resilience": 1
            }
          },
          {
            "text": "T’épuises.",
            "scores": {
              "anxiety": 2
            }
          },
          {
            "text": "Te coupes de tes émotions.",
            "scores": {
              "suppression": 2
            }
          }
        ]
      },
      {
        "id": "e18",
        "moduleId": "emotions",
        "scene": "Quand on te rassure…",
        "prompt": "Cela t’aide…",
        "options": [
          {
            "text": "Beaucoup.",
            "scores": {
              "attachmentSecurity": 1
            }
          },
          {
            "text": "Un peu.",
            "scores": {
              "anxiety": 1
            }
          },
          {
            "text": "Peu.",
            "scores": {
              "anxiety": 2
            }
          },
          {
            "text": "Seulement si je me rassure moi-même.",
            "scores": {
              "independence": 2
            }
          }
        ]
      },
      {
        "id": "e19",
        "moduleId": "emotions",
        "scene": "Après un conflit…",
        "prompt": "Ton émotion dure…",
        "options": [
          {
            "text": "Peu.",
            "scores": {
              "rumination": -2
            }
          },
          {
            "text": "Quelques heures.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "Plusieurs jours.",
            "scores": {
              "rumination": 2
            }
          },
          {
            "text": "Jusqu’à une réparation.",
            "scores": {
              "attachmentIntensity": 2
            }
          }
        ]
      }
    ]
  },
  {
    "id": "relations",
    "title": "Relations",
    "subtitle": "Attachement, empathie et limites",
    "description": "Explore la proximité, le rejet, l’intimité et la communication.",
    "questions": [
      {
        "id": "r1",
        "moduleId": "relations",
        "scene": "Tu rencontres quelqu’un avec qui tu te sens très en phase.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Prends ton temps.",
            "scores": {
              "attachmentIntensity": -1
            }
          },
          {
            "text": "Crées vite un lien profond.",
            "scores": {
              "attachmentIntensity": 2
            }
          },
          {
            "text": "Te dévoiles beaucoup.",
            "scores": {
              "attachmentIntensity": 2,
              "openness": 1
            }
          },
          {
            "text": "Restes prudent.",
            "scores": {
              "caution": 2
            }
          }
        ]
      },
      {
        "id": "r2",
        "moduleId": "relations",
        "scene": "Une personne proche met du temps à répondre.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "N’y penses pas.",
            "scores": {
              "rejectionSensitivity": -2
            }
          },
          {
            "text": "Te poses brièvement la question.",
            "scores": {
              "rejectionSensitivity": 1
            }
          },
          {
            "text": "T’inquiètes.",
            "scores": {
              "rejectionSensitivity": 2
            }
          },
          {
            "text": "Relis mentalement vos échanges.",
            "scores": {
              "rumination": 2
            }
          }
        ]
      },
      {
        "id": "r3",
        "moduleId": "relations",
        "scene": "Dans un groupe…",
        "prompt": "Tu préfères…",
        "options": [
          {
            "text": "Parler à tout le monde.",
            "scores": {
              "social": 2
            }
          },
          {
            "text": "Observer d’abord.",
            "scores": {
              "observation": 2
            }
          },
          {
            "text": "Chercher une personne.",
            "scores": {
              "depth": 2
            }
          },
          {
            "text": "Partir assez vite.",
            "scores": {
              "social": -2
            }
          }
        ]
      },
      {
        "id": "r4",
        "moduleId": "relations",
        "scene": "Quand quelqu’un souffre…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Cherches une solution.",
            "scores": {
              "empathy": 1,
              "analysis": 1
            }
          },
          {
            "text": "Écoutes.",
            "scores": {
              "empathy": 2
            }
          },
          {
            "text": "Ressens fortement ce qu’il vit.",
            "scores": {
              "empathy": 3
            }
          },
          {
            "text": "Prends de la distance pour ne pas absorber.",
            "scores": {
              "boundaries": 2
            }
          }
        ]
      },
      {
        "id": "r5",
        "moduleId": "relations",
        "scene": "Un conflit apparaît.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Affrontes directement.",
            "scores": {
              "assertiveness": 2
            }
          },
          {
            "text": "Cherches un compromis.",
            "scores": {
              "agreeableness": 2
            }
          },
          {
            "text": "Évites.",
            "scores": {
              "conflictAvoidance": 2
            }
          },
          {
            "text": "Analyses longuement avant de parler.",
            "scores": {
              "analysis": 2
            }
          }
        ]
      },
      {
        "id": "r6",
        "moduleId": "relations",
        "scene": "Tu te sens incompris.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Explique davantage.",
            "scores": {
              "assertiveness": 1
            }
          },
          {
            "text": "Te refermes.",
            "scores": {
              "withdrawal": 2
            }
          },
          {
            "text": "Cherches la bonne personne.",
            "scores": {
              "depth": 1
            }
          },
          {
            "text": "Doutes de toi.",
            "scores": {
              "rejectionSensitivity": 2
            }
          }
        ]
      },
      {
        "id": "r7",
        "moduleId": "relations",
        "scene": "Tu as besoin d’affection.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Le demandes.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "Le montres indirectement.",
            "scores": {
              "attachmentIntensity": 1
            }
          },
          {
            "text": "Attends que l’autre le devine.",
            "scores": {
              "attachmentAnxiety": 2
            }
          },
          {
            "text": "Préfères garder ton autonomie.",
            "scores": {
              "independence": 2
            }
          }
        ]
      },
      {
        "id": "r8",
        "moduleId": "relations",
        "scene": "Quelqu’un te déçoit.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "En parles.",
            "scores": {
              "assertiveness": 2
            }
          },
          {
            "text": "Pardonnes vite.",
            "scores": {
              "agreeableness": 2
            }
          },
          {
            "text": "Prends tes distances.",
            "scores": {
              "boundaries": 2
            }
          },
          {
            "text": "Y penses longtemps.",
            "scores": {
              "rumination": 2
            }
          }
        ]
      },
      {
        "id": "r9",
        "moduleId": "relations",
        "scene": "Dans une relation proche…",
        "prompt": "Tu recherches surtout…",
        "options": [
          {
            "text": "La stabilité.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "La profondeur.",
            "scores": {
              "depth": 2
            }
          },
          {
            "text": "La liberté.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "L’intensité.",
            "scores": {
              "attachmentIntensity": 2
            }
          }
        ]
      },
      {
        "id": "r10",
        "moduleId": "relations",
        "scene": "Après beaucoup de temps avec des gens…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Te sens énergisé.",
            "scores": {
              "social": 2
            }
          },
          {
            "text": "Te sens bien.",
            "scores": {
              "social": 1
            }
          },
          {
            "text": "As besoin de solitude.",
            "scores": {
              "introversion": 2
            }
          },
          {
            "text": "Te sens saturé.",
            "scores": {
              "sensorySensitivity": 1,
              "introversion": 2
            }
          }
        ]
      },
      {
        "id": "r11",
        "moduleId": "relations",
        "scene": "Tu as besoin d’espace dans une relation.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Le dis clairement.",
            "scores": {
              "assertiveness": 2
            }
          },
          {
            "text": "T’éloignes un peu.",
            "scores": {
              "boundaries": 1
            }
          },
          {
            "text": "Attends que l’autre le comprenne.",
            "scores": {
              "attachmentAnxiety": 1
            }
          },
          {
            "text": "Te sens coupable.",
            "scores": {
              "rejectionSensitivity": 1
            }
          }
        ]
      },
      {
        "id": "r12",
        "moduleId": "relations",
        "scene": "Quelqu’un te confie un secret.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Le gardes sans difficulté.",
            "scores": {
              "trustworthiness": 2
            }
          },
          {
            "text": "Le portes émotionnellement.",
            "scores": {
              "empathy": 2
            }
          },
          {
            "text": "Cherches comment aider.",
            "scores": {
              "empathy": 1,
              "analysis": 1
            }
          },
          {
            "text": "Prends de la distance.",
            "scores": {
              "boundaries": 2
            }
          }
        ]
      },
      {
        "id": "r13",
        "moduleId": "relations",
        "scene": "Quand une relation devient très intense…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Te sens nourri.",
            "scores": {
              "attachmentIntensity": 2
            }
          },
          {
            "text": "Te sens rassuré.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "As besoin d’air.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "As peur de perdre l’autre.",
            "scores": {
              "attachmentAnxiety": 2
            }
          }
        ]
      },
      {
        "id": "r14",
        "moduleId": "relations",
        "scene": "Tu préfères être entouré de personnes…",
        "prompt": "Qui sont…",
        "options": [
          {
            "text": "Fiables.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "Stimulantes.",
            "scores": {
              "novelty": 2
            }
          },
          {
            "text": "Profondes.",
            "scores": {
              "depth": 2
            }
          },
          {
            "text": "Douces.",
            "scores": {
              "agreeableness": 2
            }
          }
        ]
      },
      {
        "id": "r15",
        "moduleId": "relations",
        "scene": "Tu dois demander de l’aide.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Le fais facilement.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "Hésites un peu.",
            "scores": {
              "independence": 1
            }
          },
          {
            "text": "Préfères gérer seul.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "Attends d’être au bout.",
            "scores": {
              "avoidance": 1
            }
          }
        ]
      },
      {
        "id": "r16",
        "moduleId": "relations",
        "scene": "Quand quelqu’un pleure devant toi…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Reste présent.",
            "scores": {
              "empathy": 2
            }
          },
          {
            "text": "Cherches les bons mots.",
            "scores": {
              "empathy": 1
            }
          },
          {
            "text": "Ressens sa douleur.",
            "scores": {
              "empathy": 3
            }
          },
          {
            "text": "Te sens maladroit.",
            "scores": {
              "socialAnxiety": 1
            }
          }
        ]
      },
      {
        "id": "r17",
        "moduleId": "relations",
        "scene": "Dans une relation, le silence…",
        "prompt": "Est…",
        "options": [
          {
            "text": "Confortable.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "Neutre.",
            "scores": {
              "social": 0
            }
          },
          {
            "text": "Un peu inquiétant.",
            "scores": {
              "attachmentAnxiety": 1
            }
          },
          {
            "text": "Très chargé.",
            "scores": {
              "rejectionSensitivity": 2
            }
          }
        ]
      },
      {
        "id": "r18",
        "moduleId": "relations",
        "scene": "Tu te sens trahi.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Confrontes.",
            "scores": {
              "assertiveness": 2
            }
          },
          {
            "text": "Romps le lien.",
            "scores": {
              "boundaries": 2
            }
          },
          {
            "text": "Cherches à comprendre.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Doutes de toi.",
            "scores": {
              "rejectionSensitivity": 2
            }
          }
        ]
      },
      {
        "id": "r19",
        "moduleId": "relations",
        "scene": "Une relation saine doit surtout offrir…",
        "prompt": "Choisis.",
        "options": [
          {
            "text": "Sécurité.",
            "scores": {
              "attachmentSecurity": 2
            }
          },
          {
            "text": "Liberté.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "Profondeur.",
            "scores": {
              "depth": 2
            }
          },
          {
            "text": "Joie.",
            "scores": {
              "social": 1
            }
          }
        ]
      }
    ]
  },
  {
    "id": "cognition",
    "title": "Cognition",
    "subtitle": "Intuition, logique et imagination",
    "description": "Explore ton style de pensée, d’apprentissage et de résolution.",
    "questions": [
      {
        "id": "c1",
        "moduleId": "cognition",
        "scene": "Face à un problème complexe…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Le découpes en étapes.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Cherches une intuition globale.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Imagines plusieurs solutions.",
            "scores": {
              "divergence": 2
            }
          },
          {
            "text": "Demandes des exemples.",
            "scores": {
              "practicality": 2
            }
          }
        ]
      },
      {
        "id": "c2",
        "moduleId": "cognition",
        "scene": "Quand tu observes une œuvre…",
        "prompt": "Tu vois surtout…",
        "options": [
          {
            "text": "La technique.",
            "scores": {
              "analysis": 1
            }
          },
          {
            "text": "L’émotion.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "Le symbole.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Le message social.",
            "scores": {
              "contextualThinking": 2
            }
          }
        ]
      },
      {
        "id": "c3",
        "moduleId": "cognition",
        "scene": "Une idée inhabituelle apparaît.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La testes.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "La développes.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "La relies à d’autres.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "La laisses passer.",
            "scores": {
              "divergence": -1
            }
          }
        ]
      },
      {
        "id": "c4",
        "moduleId": "cognition",
        "scene": "Tu dois mémoriser quelque chose.",
        "prompt": "Tu préfères…",
        "options": [
          {
            "text": "Répéter.",
            "scores": {
              "workingMemory": 1
            }
          },
          {
            "text": "Comprendre.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Visualiser.",
            "scores": {
              "visualThinking": 2
            }
          },
          {
            "text": "Associer à une histoire.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "c5",
        "moduleId": "cognition",
        "scene": "Ton esprit pense plutôt en…",
        "prompt": "Choisis.",
        "options": [
          {
            "text": "Mots.",
            "scores": {
              "verbalThinking": 2
            }
          },
          {
            "text": "Images.",
            "scores": {
              "visualThinking": 2
            }
          },
          {
            "text": "Structures.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Associations.",
            "scores": {
              "divergence": 2
            }
          }
        ]
      },
      {
        "id": "c6",
        "moduleId": "cognition",
        "scene": "Face à une contradiction…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Cherches qui a raison.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Cherches ce que chaque côté révèle.",
            "scores": {
              "contextualThinking": 2
            }
          },
          {
            "text": "Tolères les deux.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Te sens inconfortable.",
            "scores": {
              "cognitiveRigidity": 2
            }
          }
        ]
      },
      {
        "id": "c7",
        "moduleId": "cognition",
        "scene": "Quand tu crées…",
        "prompt": "Les idées viennent…",
        "options": [
          {
            "text": "Par méthode.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Par intuition.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Par accumulation.",
            "scores": {
              "divergence": 2
            }
          },
          {
            "text": "Par émotion.",
            "scores": {
              "sensitivity": 2
            }
          }
        ]
      },
      {
        "id": "c8",
        "moduleId": "cognition",
        "scene": "Tu apprends mieux…",
        "prompt": "Quand…",
        "options": [
          {
            "text": "On t’explique.",
            "scores": {
              "verbalThinking": 2
            }
          },
          {
            "text": "Tu pratiques.",
            "scores": {
              "practicality": 2
            }
          },
          {
            "text": "Tu vois.",
            "scores": {
              "visualThinking": 2
            }
          },
          {
            "text": "Tu comprends le sens.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "c9",
        "moduleId": "cognition",
        "scene": "Tu remarques facilement…",
        "prompt": "Surtout…",
        "options": [
          {
            "text": "Les erreurs.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Les détails visuels.",
            "scores": {
              "observation": 2
            }
          },
          {
            "text": "Les changements d’ambiance.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "Les liens cachés.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "c10",
        "moduleId": "cognition",
        "scene": "Quand plusieurs réponses sont possibles…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Choisis vite.",
            "scores": {
              "decisiveness": 2
            }
          },
          {
            "text": "Compares.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Gardes plusieurs options ouvertes.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Cherches une troisième voie.",
            "scores": {
              "divergence": 2
            }
          }
        ]
      },
      {
        "id": "c11",
        "moduleId": "cognition",
        "scene": "Tu comprends une idée abstraite…",
        "prompt": "Quand…",
        "options": [
          {
            "text": "Elle est démontrée.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Elle est illustrée.",
            "scores": {
              "visualThinking": 2
            }
          },
          {
            "text": "Elle est reliée à autre chose.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Tu peux l’expérimenter.",
            "scores": {
              "practicality": 2
            }
          }
        ]
      },
      {
        "id": "c12",
        "moduleId": "cognition",
        "scene": "Quand tu lis un texte dense…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Suis ligne par ligne.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Cherches l’idée centrale.",
            "scores": {
              "symbolic": 1
            }
          },
          {
            "text": "Fais des liens.",
            "scores": {
              "divergence": 2
            }
          },
          {
            "text": "Visualises.",
            "scores": {
              "visualThinking": 2
            }
          }
        ]
      },
      {
        "id": "c13",
        "moduleId": "cognition",
        "scene": "Une solution simple existe.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La choisis.",
            "scores": {
              "practicality": 2
            }
          },
          {
            "text": "Cherches mieux.",
            "scores": {
              "perfectionism": 1
            }
          },
          {
            "text": "Imagines autre chose.",
            "scores": {
              "divergence": 2
            }
          },
          {
            "text": "Vérifies d’abord.",
            "scores": {
              "analysis": 2
            }
          }
        ]
      },
      {
        "id": "c14",
        "moduleId": "cognition",
        "scene": "Tu préfères apprendre…",
        "prompt": "Par…",
        "options": [
          {
            "text": "Une méthode.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Exploration.",
            "scores": {
              "divergence": 2
            }
          },
          {
            "text": "Discussion.",
            "scores": {
              "verbalThinking": 2
            }
          },
          {
            "text": "Immersion.",
            "scores": {
              "visualThinking": 1
            }
          }
        ]
      },
      {
        "id": "c15",
        "moduleId": "cognition",
        "scene": "Quand deux idées s’opposent…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Choisis la plus solide.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Cherches leur point commun.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Gardes les deux.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Crées une synthèse.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "c16",
        "moduleId": "cognition",
        "scene": "Ton intuition…",
        "prompt": "Est…",
        "options": [
          {
            "text": "Rare.",
            "scores": {
              "symbolic": -1
            }
          },
          {
            "text": "Parfois utile.",
            "scores": {
              "symbolic": 1
            }
          },
          {
            "text": "Souvent juste.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "Très centrale.",
            "scores": {
              "symbolic": 3
            }
          }
        ]
      },
      {
        "id": "c17",
        "moduleId": "cognition",
        "scene": "Tu mémorises mieux…",
        "prompt": "Ce qui est…",
        "options": [
          {
            "text": "Répété.",
            "scores": {
              "workingMemory": 1
            }
          },
          {
            "text": "Émotionnel.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "Structuré.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Symbolique.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "c18",
        "moduleId": "cognition",
        "scene": "Tu remarques une incohérence.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La corriges.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "La notes.",
            "scores": {
              "observation": 2
            }
          },
          {
            "text": "Cherches son origine.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Te demandes ce qu’elle révèle.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "c19",
        "moduleId": "cognition",
        "scene": "Quand tu crées une histoire…",
        "prompt": "Tu pars de…",
        "options": [
          {
            "text": "La structure.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Un personnage.",
            "scores": {
              "empathy": 1
            }
          },
          {
            "text": "Une image.",
            "scores": {
              "visualThinking": 2
            }
          },
          {
            "text": "Un thème.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      }
    ]
  },
  {
    "id": "neurodiversite",
    "title": "Neurodiversité",
    "subtitle": "Sensorialité, flexibilité et décalage",
    "description": "Explore avec prudence certains traits sensoriels et sociaux.",
    "questions": [
      {
        "id": "n1",
        "moduleId": "neurodiversite",
        "scene": "Dans un restaurant bruyant…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Suis la conversation sans difficulté.",
            "scores": {
              "sensorySensitivity": -2
            }
          },
          {
            "text": "Es un peu distrait.",
            "scores": {
              "sensorySensitivity": 1
            }
          },
          {
            "text": "Te fatigues vite.",
            "scores": {
              "sensorySensitivity": 2
            }
          },
          {
            "text": "As l’impression que tous les sons arrivent au même niveau.",
            "scores": {
              "sensorySensitivity": 3,
              "autisticTraits": 1
            }
          }
        ]
      },
      {
        "id": "n2",
        "moduleId": "neurodiversite",
        "scene": "Ton programme change au dernier moment.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "T’adaptes facilement.",
            "scores": {
              "autisticTraits": -2,
              "flexibility": 2
            }
          },
          {
            "text": "Râles un peu puis t’adaptes.",
            "scores": {
              "flexibility": 1
            }
          },
          {
            "text": "Te sens déstabilisé.",
            "scores": {
              "autisticTraits": 1,
              "anxiety": 1
            }
          },
          {
            "text": "As besoin de temps pour te réorganiser.",
            "scores": {
              "autisticTraits": 2
            }
          }
        ]
      },
      {
        "id": "n3",
        "moduleId": "neurodiversite",
        "scene": "Quand un sujet te passionne…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "T’y intéresses normalement.",
            "scores": {
              "autisticTraits": -1
            }
          },
          {
            "text": "Y consacres beaucoup de temps.",
            "scores": {
              "specialInterests": 1
            }
          },
          {
            "text": "Accumules énormément d’informations.",
            "scores": {
              "specialInterests": 2,
              "autisticTraits": 1
            }
          },
          {
            "text": "Peux en parler très longtemps.",
            "scores": {
              "specialInterests": 2,
              "autisticTraits": 1
            }
          }
        ]
      },
      {
        "id": "n4",
        "moduleId": "neurodiversite",
        "scene": "Quand une personne dit quelque chose d’ambigu…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Comprends facilement.",
            "scores": {
              "autisticTraits": -2
            }
          },
          {
            "text": "Hésites parfois.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Préfères qu’on soit direct.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Analyses longtemps.",
            "scores": {
              "autisticTraits": 1,
              "rumination": 2
            }
          }
        ]
      },
      {
        "id": "n5",
        "moduleId": "neurodiversite",
        "scene": "Dans les interactions sociales…",
        "prompt": "Tu as parfois l’impression de jouer un rôle ?",
        "options": [
          {
            "text": "Pas vraiment.",
            "scores": {
              "autisticTraits": -2
            }
          },
          {
            "text": "Parfois.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "autisticTraits": 2
            }
          },
          {
            "text": "Presque constamment.",
            "scores": {
              "autisticTraits": 3
            }
          }
        ]
      },
      {
        "id": "n6",
        "moduleId": "neurodiversite",
        "scene": "Les textures, lumières ou odeurs…",
        "prompt": "Te gênent…",
        "options": [
          {
            "text": "Rarement.",
            "scores": {
              "sensorySensitivity": -2
            }
          },
          {
            "text": "Parfois.",
            "scores": {
              "sensorySensitivity": 1
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "sensorySensitivity": 2
            }
          },
          {
            "text": "Très fortement.",
            "scores": {
              "sensorySensitivity": 3
            }
          }
        ]
      },
      {
        "id": "n7",
        "moduleId": "neurodiversite",
        "scene": "Tu comprends les règles sociales…",
        "prompt": "Comment ?",
        "options": [
          {
            "text": "Intuitivement.",
            "scores": {
              "autisticTraits": -2
            }
          },
          {
            "text": "Assez naturellement.",
            "scores": {
              "autisticTraits": -1
            }
          },
          {
            "text": "En observant.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "En les analysant consciemment.",
            "scores": {
              "autisticTraits": 2
            }
          }
        ]
      },
      {
        "id": "n8",
        "moduleId": "neurodiversite",
        "scene": "Après une journée sociale…",
        "prompt": "Tu as besoin…",
        "options": [
          {
            "text": "De continuer.",
            "scores": {
              "social": 2
            }
          },
          {
            "text": "D’un peu de calme.",
            "scores": {
              "introversion": 1
            }
          },
          {
            "text": "De solitude.",
            "scores": {
              "introversion": 2
            }
          },
          {
            "text": "De récupérer longtemps.",
            "scores": {
              "introversion": 2,
              "sensorySensitivity": 1
            }
          }
        ]
      },
      {
        "id": "n9",
        "moduleId": "neurodiversite",
        "scene": "Les habitudes…",
        "prompt": "Pour toi…",
        "options": [
          {
            "text": "Sont peu importantes.",
            "scores": {
              "cognitiveRigidity": -2
            }
          },
          {
            "text": "Aident un peu.",
            "scores": {
              "structure": 1
            }
          },
          {
            "text": "Rassurent.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Sont difficiles à modifier.",
            "scores": {
              "cognitiveRigidity": 2
            }
          }
        ]
      },
      {
        "id": "n10",
        "moduleId": "neurodiversite",
        "scene": "Tu te sens différent des autres…",
        "prompt": "Depuis…",
        "options": [
          {
            "text": "Pas vraiment.",
            "scores": {
              "socialDifference": -2
            }
          },
          {
            "text": "Par périodes.",
            "scores": {
              "socialDifference": 1
            }
          },
          {
            "text": "Longtemps.",
            "scores": {
              "socialDifference": 2
            }
          },
          {
            "text": "Depuis l’enfance.",
            "scores": {
              "socialDifference": 3
            }
          }
        ]
      },
      {
        "id": "n11",
        "moduleId": "neurodiversite",
        "scene": "Dans un nouvel environnement…",
        "prompt": "Tu repères d’abord…",
        "options": [
          {
            "text": "Les personnes.",
            "scores": {
              "social": 1
            }
          },
          {
            "text": "Les règles implicites.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Les détails sensoriels.",
            "scores": {
              "sensorySensitivity": 2
            }
          },
          {
            "text": "Les sorties et repères.",
            "scores": {
              "structure": 1
            }
          }
        ]
      },
      {
        "id": "n12",
        "moduleId": "neurodiversite",
        "scene": "Tu préfères que les gens…",
        "prompt": "Soient…",
        "options": [
          {
            "text": "Subtils.",
            "scores": {
              "autisticTraits": -1
            }
          },
          {
            "text": "Directs.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Prévisibles.",
            "scores": {
              "structure": 1
            }
          },
          {
            "text": "Spontanés.",
            "scores": {
              "flexibility": 1
            }
          }
        ]
      },
      {
        "id": "n13",
        "moduleId": "neurodiversite",
        "scene": "Une texture désagréable…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’ignores.",
            "scores": {
              "sensorySensitivity": -2
            }
          },
          {
            "text": "La remarques.",
            "scores": {
              "sensorySensitivity": 1
            }
          },
          {
            "text": "La supportes difficilement.",
            "scores": {
              "sensorySensitivity": 2
            }
          },
          {
            "text": "Dois l’éviter.",
            "scores": {
              "sensorySensitivity": 3
            }
          }
        ]
      },
      {
        "id": "n14",
        "moduleId": "neurodiversite",
        "scene": "Dans une conversation rapide…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Suis facilement.",
            "scores": {
              "autisticTraits": -2
            }
          },
          {
            "text": "As besoin d’un temps.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Prépares tes réponses.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Te sens en retard.",
            "scores": {
              "autisticTraits": 2
            }
          }
        ]
      },
      {
        "id": "n15",
        "moduleId": "neurodiversite",
        "scene": "Quand une habitude est interrompue…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "T’adaptes.",
            "scores": {
              "cognitiveRigidity": -2
            }
          },
          {
            "text": "Râles un peu.",
            "scores": {
              "cognitiveRigidity": 1
            }
          },
          {
            "text": "Te sens déstabilisé.",
            "scores": {
              "cognitiveRigidity": 2
            }
          },
          {
            "text": "As du mal à repartir.",
            "scores": {
              "cognitiveRigidity": 3
            }
          }
        ]
      },
      {
        "id": "n16",
        "moduleId": "neurodiversite",
        "scene": "Tu remarques les sons que les autres ignorent…",
        "prompt": "Cela arrive…",
        "options": [
          {
            "text": "Rarement.",
            "scores": {
              "sensorySensitivity": -2
            }
          },
          {
            "text": "Parfois.",
            "scores": {
              "sensorySensitivity": 1
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "sensorySensitivity": 2
            }
          },
          {
            "text": "Très souvent.",
            "scores": {
              "sensorySensitivity": 3
            }
          }
        ]
      },
      {
        "id": "n17",
        "moduleId": "neurodiversite",
        "scene": "Dans une conversation de groupe…",
        "prompt": "Tu sais quand parler…",
        "options": [
          {
            "text": "Naturellement.",
            "scores": {
              "autisticTraits": -2
            }
          },
          {
            "text": "La plupart du temps.",
            "scores": {
              "autisticTraits": -1
            }
          },
          {
            "text": "En observant.",
            "scores": {
              "autisticTraits": 1
            }
          },
          {
            "text": "Difficilement.",
            "scores": {
              "autisticTraits": 2
            }
          }
        ]
      },
      {
        "id": "n18",
        "moduleId": "neurodiversite",
        "scene": "Un intérêt intense…",
        "prompt": "Chez toi…",
        "options": [
          {
            "text": "Reste modéré.",
            "scores": {
              "specialInterests": -1
            }
          },
          {
            "text": "Prend beaucoup de place.",
            "scores": {
              "specialInterests": 2
            }
          },
          {
            "text": "Structure une période de vie.",
            "scores": {
              "specialInterests": 3
            }
          },
          {
            "text": "Devient une expertise.",
            "scores": {
              "specialInterests": 3
            }
          }
        ]
      },
      {
        "id": "n19",
        "moduleId": "neurodiversite",
        "scene": "Quand tu es socialement fatigué…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Continues quand même.",
            "scores": {
              "masking": 1
            }
          },
          {
            "text": "Te fais plus discret.",
            "scores": {
              "introversion": 1
            }
          },
          {
            "text": "Joues un rôle.",
            "scores": {
              "masking": 2
            }
          },
          {
            "text": "Dois partir.",
            "scores": {
              "sensorySensitivity": 1
            }
          }
        ]
      }
    ]
  },
  {
    "id": "quotidien",
    "title": "Vie quotidienne",
    "subtitle": "Organisation, énergie et habitudes",
    "description": "Explore tes routines, ton énergie et la mise en action.",
    "questions": [
      {
        "id": "d1",
        "moduleId": "quotidien",
        "scene": "Tu dois maintenir une habitude pendant un mois.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La suis facilement.",
            "scores": {
              "habitStability": 2
            }
          },
          {
            "text": "Tiens si elle a du sens.",
            "scores": {
              "meaning": 1,
              "habitStability": 1
            }
          },
          {
            "text": "Commences fort puis lâches.",
            "scores": {
              "moodVariability": 1,
              "habitStability": -1
            }
          },
          {
            "text": "Oublies souvent.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "d2",
        "moduleId": "quotidien",
        "scene": "Ta semaine est très peu structurée.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Crées ton rythme.",
            "scores": {
              "structure": 1
            }
          },
          {
            "text": "Profites de la liberté.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "Te disperses.",
            "scores": {
              "executiveDifficulty": 1
            }
          },
          {
            "text": "Te sens perdu.",
            "scores": {
              "structure": -2
            }
          }
        ]
      },
      {
        "id": "d3",
        "moduleId": "quotidien",
        "scene": "Une tâche ménagère s’accumule.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La fais vite.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "La planifies.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "La repousses.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "La fais sous pression.",
            "scores": {
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "d4",
        "moduleId": "quotidien",
        "scene": "Ton sommeil…",
        "prompt": "Est…",
        "options": [
          {
            "text": "Régulier.",
            "scores": {
              "sleepStability": 2
            }
          },
          {
            "text": "Variable.",
            "scores": {
              "sleepStability": -1
            }
          },
          {
            "text": "Retardé par les pensées.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "Retardé par les écrans.",
            "scores": {
              "avoidance": 1
            }
          }
        ]
      },
      {
        "id": "d5",
        "moduleId": "quotidien",
        "scene": "Quand tu as beaucoup d’énergie…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "L’utilises régulièrement.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Lances plusieurs projets.",
            "scores": {
              "impulsivity": 1
            }
          },
          {
            "text": "Crées intensément.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Risques de t’épuiser.",
            "scores": {
              "moodVariability": 2
            }
          }
        ]
      },
      {
        "id": "d6",
        "moduleId": "quotidien",
        "scene": "Quand tu as peu d’énergie…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Réduis le rythme.",
            "scores": {
              "selfCare": 2
            }
          },
          {
            "text": "Maintiens l’essentiel.",
            "scores": {
              "execution": 1
            }
          },
          {
            "text": "Te réfugies dans les écrans.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "Te sens coupable.",
            "scores": {
              "perfectionism": 1
            }
          }
        ]
      },
      {
        "id": "d7",
        "moduleId": "quotidien",
        "scene": "Les papiers administratifs…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Les gères vite.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Les regroupes.",
            "scores": {
              "planning": 1
            }
          },
          {
            "text": "Les repousses.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "Les oublies.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "d8",
        "moduleId": "quotidien",
        "scene": "Pour commencer une tâche…",
        "prompt": "Tu as besoin…",
        "options": [
          {
            "text": "De rien de particulier.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "D’un plan.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "D’un élan.",
            "scores": {
              "motivationVariability": 2
            }
          },
          {
            "text": "D’une urgence.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      },
      {
        "id": "d9",
        "moduleId": "quotidien",
        "scene": "Ton espace de vie…",
        "prompt": "Est plutôt…",
        "options": [
          {
            "text": "Très organisé.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Fonctionnel.",
            "scores": {
              "practicality": 1
            }
          },
          {
            "text": "Créatif mais irrégulier.",
            "scores": {
              "creativity": 1
            }
          },
          {
            "text": "Souvent encombré.",
            "scores": {
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "d10",
        "moduleId": "quotidien",
        "scene": "Quand une journée se vide de toute obligation…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Trouves naturellement quoi faire.",
            "scores": {
              "selfDirection": 2
            }
          },
          {
            "text": "Crées.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Te disperses.",
            "scores": {
              "executiveDifficulty": 1
            }
          },
          {
            "text": "T’ennuies.",
            "scores": {
              "lowMood": 1
            }
          }
        ]
      },
      {
        "id": "d11",
        "moduleId": "quotidien",
        "scene": "Tu dois organiser un déplacement.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Prépares tout.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "Prépares l’essentiel.",
            "scores": {
              "planning": 1
            }
          },
          {
            "text": "Improvises.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "Risques d’oublier un détail.",
            "scores": {
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "d12",
        "moduleId": "quotidien",
        "scene": "Ton bureau est encombré.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Ranges.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Tolères un peu.",
            "scores": {
              "flexibility": 1
            }
          },
          {
            "text": "T’y retrouves quand même.",
            "scores": {
              "creativity": 1
            }
          },
          {
            "text": "Te sens bloqué.",
            "scores": {
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "d13",
        "moduleId": "quotidien",
        "scene": "Tu veux reprendre le sport.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Planifies.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "Commences tout de suite.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Attends l’élan.",
            "scores": {
              "motivationVariability": 2
            }
          },
          {
            "text": "Repousses.",
            "scores": {
              "avoidance": 2
            }
          }
        ]
      },
      {
        "id": "d14",
        "moduleId": "quotidien",
        "scene": "Une journée se passe mal.",
        "prompt": "Le soir…",
        "options": [
          {
            "text": "Tu récupères.",
            "scores": {
              "resilience": 2
            }
          },
          {
            "text": "Tu y penses.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "Tu compenses avec les écrans.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "Tu changes tes plans du lendemain.",
            "scores": {
              "planning": 1
            }
          }
        ]
      },
      {
        "id": "d15",
        "moduleId": "quotidien",
        "scene": "Tu dois faire plusieurs courses.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Fais une liste.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "Mémorises.",
            "scores": {
              "workingMemory": 1
            }
          },
          {
            "text": "Improvises.",
            "scores": {
              "flexibility": 1
            }
          },
          {
            "text": "Oublies parfois.",
            "scores": {
              "workingMemory": -1
            }
          }
        ]
      },
      {
        "id": "d16",
        "moduleId": "quotidien",
        "scene": "Une tâche te paraît énorme.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La découpes.",
            "scores": {
              "planning": 2
            }
          },
          {
            "text": "Commences quelque part.",
            "scores": {
              "execution": 1
            }
          },
          {
            "text": "La repousses.",
            "scores": {
              "avoidance": 2
            }
          },
          {
            "text": "Cherches de l’aide.",
            "scores": {
              "socialSupport": 1
            }
          }
        ]
      },
      {
        "id": "d17",
        "moduleId": "quotidien",
        "scene": "Ton niveau d’énergie change…",
        "prompt": "Au fil de la journée…",
        "options": [
          {
            "text": "Peu.",
            "scores": {
              "moodVariability": -1
            }
          },
          {
            "text": "Un peu.",
            "scores": {
              "moodVariability": 1
            }
          },
          {
            "text": "Beaucoup.",
            "scores": {
              "moodVariability": 2
            }
          },
          {
            "text": "Selon le contexte.",
            "scores": {
              "motivationVariability": 2
            }
          }
        ]
      },
      {
        "id": "d18",
        "moduleId": "quotidien",
        "scene": "Quand tu termines une tâche…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Passes à la suivante.",
            "scores": {
              "execution": 2
            }
          },
          {
            "text": "Prends une pause.",
            "scores": {
              "selfCare": 1
            }
          },
          {
            "text": "Cherches une récompense.",
            "scores": {
              "motivationVariability": 1
            }
          },
          {
            "text": "Te sens vidé.",
            "scores": {
              "executiveDifficulty": 1
            }
          }
        ]
      },
      {
        "id": "d19",
        "moduleId": "quotidien",
        "scene": "Pour être efficace…",
        "prompt": "Tu as surtout besoin de…",
        "options": [
          {
            "text": "Structure.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Silence.",
            "scores": {
              "sensorySensitivity": 1
            }
          },
          {
            "text": "Sens.",
            "scores": {
              "meaning": 2
            }
          },
          {
            "text": "Urgence.",
            "scores": {
              "executiveDifficulty": 2
            }
          }
        ]
      }
    ]
  },
  {
    "id": "sens_identite",
    "title": "Sens & identité",
    "subtitle": "Valeurs, vocation et émerveillement",
    "description": "Explore ce qui donne une direction profonde à ta vie.",
    "questions": [
      {
        "id": "s1",
        "moduleId": "sens_identite",
        "scene": "Tu regardes ta vie actuelle.",
        "prompt": "Ce qui compte le plus est…",
        "options": [
          {
            "text": "La stabilité.",
            "scores": {
              "stability": 2
            }
          },
          {
            "text": "La réussite.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "L’amour.",
            "scores": {
              "attachment": 2
            }
          },
          {
            "text": "Le sens.",
            "scores": {
              "meaning": 3
            }
          }
        ]
      },
      {
        "id": "s2",
        "moduleId": "sens_identite",
        "scene": "Tu traverses une période difficile.",
        "prompt": "Tu cherches…",
        "options": [
          {
            "text": "Une solution.",
            "scores": {
              "practicality": 2
            }
          },
          {
            "text": "Du soutien.",
            "scores": {
              "socialSupport": 2
            }
          },
          {
            "text": "Une compréhension.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Une transformation.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s3",
        "moduleId": "sens_identite",
        "scene": "Face à la beauté…",
        "prompt": "Tu ressens…",
        "options": [
          {
            "text": "Du plaisir.",
            "scores": {
              "aesthetic": 1
            }
          },
          {
            "text": "De l’émotion.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "Un appel à créer.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Quelque chose de presque sacré.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s4",
        "moduleId": "sens_identite",
        "scene": "Tu penses à ton avenir.",
        "prompt": "Tu veux surtout…",
        "options": [
          {
            "text": "Être en sécurité.",
            "scores": {
              "stability": 2
            }
          },
          {
            "text": "Réussir.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Être libre.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "Être fidèle à toi-même.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s5",
        "moduleId": "sens_identite",
        "scene": "Une croyance importante est remise en cause.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La défends.",
            "scores": {
              "cognitiveRigidity": 1
            }
          },
          {
            "text": "La réexamines.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "La transformes.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "Cherches ce qu’elle symbolise.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "s6",
        "moduleId": "sens_identite",
        "scene": "Tu as le sentiment d’avoir une mission…",
        "prompt": "Cela te ressemble…",
        "options": [
          {
            "text": "Pas du tout.",
            "scores": {
              "purpose": -2
            }
          },
          {
            "text": "Un peu.",
            "scores": {
              "purpose": 1
            }
          },
          {
            "text": "Beaucoup.",
            "scores": {
              "purpose": 2
            }
          },
          {
            "text": "Profondément.",
            "scores": {
              "purpose": 3
            }
          }
        ]
      },
      {
        "id": "s7",
        "moduleId": "sens_identite",
        "scene": "Quand tu souffres…",
        "prompt": "Tu cherches surtout…",
        "options": [
          {
            "text": "À faire cesser la douleur.",
            "scores": {
              "practicality": 1
            }
          },
          {
            "text": "À être compris.",
            "scores": {
              "attachment": 1
            }
          },
          {
            "text": "À comprendre.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "À en faire quelque chose.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s8",
        "moduleId": "sens_identite",
        "scene": "Ce qui t’émerveille le plus…",
        "prompt": "C’est…",
        "options": [
          {
            "text": "La réussite humaine.",
            "scores": {
              "achievement": 1
            }
          },
          {
            "text": "La nature.",
            "scores": {
              "aesthetic": 2
            }
          },
          {
            "text": "L’amour.",
            "scores": {
              "attachment": 2
            }
          },
          {
            "text": "Le mystère.",
            "scores": {
              "symbolic": 2
            }
          }
        ]
      },
      {
        "id": "s9",
        "moduleId": "sens_identite",
        "scene": "Ton identité…",
        "prompt": "Tu la vis comme…",
        "options": [
          {
            "text": "Stable.",
            "scores": {
              "identityStability": 2
            }
          },
          {
            "text": "En évolution.",
            "scores": {
              "flexibility": 2
            }
          },
          {
            "text": "Complexe.",
            "scores": {
              "complexityTolerance": 2
            }
          },
          {
            "text": "Encore à découvrir.",
            "scores": {
              "purpose": 1
            }
          }
        ]
      },
      {
        "id": "s10",
        "moduleId": "sens_identite",
        "scene": "À la fin d’une vie réussie…",
        "prompt": "Il faudrait avoir…",
        "options": [
          {
            "text": "Construit.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Aimé.",
            "scores": {
              "attachment": 2
            }
          },
          {
            "text": "Compris.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "Été fidèle à l’essentiel.",
            "scores": {
              "meaning": 3
            }
          }
        ]
      },
      {
        "id": "s11",
        "moduleId": "sens_identite",
        "scene": "Tu te sens aligné quand…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Agis selon tes valeurs.",
            "scores": {
              "values": 2
            }
          },
          {
            "text": "Réussis.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Crées.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Aimes.",
            "scores": {
              "attachment": 2
            }
          }
        ]
      },
      {
        "id": "s12",
        "moduleId": "sens_identite",
        "scene": "Tu traverses une transition de vie.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Cherches un plan.",
            "scores": {
              "structure": 2
            }
          },
          {
            "text": "Cherches un sens.",
            "scores": {
              "meaning": 2
            }
          },
          {
            "text": "Cherches du soutien.",
            "scores": {
              "socialSupport": 2
            }
          },
          {
            "text": "Cherches une nouvelle identité.",
            "scores": {
              "identityExploration": 2
            }
          }
        ]
      },
      {
        "id": "s13",
        "moduleId": "sens_identite",
        "scene": "Une expérience te dépasse.",
        "prompt": "Tu…",
        "options": [
          {
            "text": "La rationalises.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "La ressens.",
            "scores": {
              "sensitivity": 2
            }
          },
          {
            "text": "La symbolises.",
            "scores": {
              "symbolic": 2
            }
          },
          {
            "text": "La laisses ouverte.",
            "scores": {
              "complexityTolerance": 2
            }
          }
        ]
      },
      {
        "id": "s14",
        "moduleId": "sens_identite",
        "scene": "Tu as besoin de croire…",
        "prompt": "En…",
        "options": [
          {
            "text": "Toi.",
            "scores": {
              "selfTrust": 2
            }
          },
          {
            "text": "L’amour.",
            "scores": {
              "attachment": 2
            }
          },
          {
            "text": "Le progrès.",
            "scores": {
              "achievement": 1
            }
          },
          {
            "text": "Une direction plus grande.",
            "scores": {
              "purpose": 2
            }
          }
        ]
      },
      {
        "id": "s15",
        "moduleId": "sens_identite",
        "scene": "Tu te sens vivant quand…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Accomplis.",
            "scores": {
              "achievement": 2
            }
          },
          {
            "text": "Crées.",
            "scores": {
              "creativity": 2
            }
          },
          {
            "text": "Partages.",
            "scores": {
              "social": 1
            }
          },
          {
            "text": "Touches quelque chose d’essentiel.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s16",
        "moduleId": "sens_identite",
        "scene": "Ton passé…",
        "prompt": "Tu le vois comme…",
        "options": [
          {
            "text": "Une suite de faits.",
            "scores": {
              "analysis": 1
            }
          },
          {
            "text": "Une histoire.",
            "scores": {
              "symbolic": 1
            }
          },
          {
            "text": "Une source de blessures.",
            "scores": {
              "rumination": 1
            }
          },
          {
            "text": "Une matière de transformation.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      },
      {
        "id": "s17",
        "moduleId": "sens_identite",
        "scene": "Une vie authentique exige…",
        "prompt": "Surtout…",
        "options": [
          {
            "text": "Du courage.",
            "scores": {
              "values": 2
            }
          },
          {
            "text": "De la lucidité.",
            "scores": {
              "analysis": 2
            }
          },
          {
            "text": "De la liberté.",
            "scores": {
              "independence": 2
            }
          },
          {
            "text": "De la fidélité intérieure.",
            "scores": {
              "meaning": 2
            }
          }
        ]
      }
    ]
  }
];
