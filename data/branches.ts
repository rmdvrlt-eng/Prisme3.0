import { Question } from '@/types/prisme';

export const branches: Record<string,{axis:string;threshold:number;questions:Question[]}> = {
  "adhd": {
    "axis": "adhdAttention",
    "threshold": 64,
    "questions": [
      {
        "id": "ba1",
        "moduleId": "attention",
        "scene": "Quand tu réalises une tâche répétitive…",
        "prompt": "Tu fais des erreurs d’inattention…",
        "options": [
          {
            "text": "Rarement.",
            "scores": {
              "adhdAttention": -2
            }
          },
          {
            "text": "Parfois.",
            "scores": {
              "adhdAttention": 1
            }
          },
          {
            "text": "Souvent.",
            "scores": {
              "adhdAttention": 2
            }
          },
          {
            "text": "Très souvent.",
            "scores": {
              "adhdAttention": 3
            }
          }
        ]
      },
      {
        "id": "ba2",
        "moduleId": "attention",
        "scene": "Quand une tâche exige plusieurs étapes…",
        "prompt": "Tu…",
        "options": [
          {
            "text": "Les suis facilement.",
            "scores": {
              "executiveDifficulty": -2
            }
          },
          {
            "text": "As besoin d’une liste.",
            "scores": {
              "planning": 1
            }
          },
          {
            "text": "Perds parfois une étape.",
            "scores": {
              "executiveDifficulty": 2
            }
          },
          {
            "text": "Abandonnes sans structure.",
            "scores": {
              "executiveDifficulty": 3
            }
          }
        ]
      }
    ]
  },
  "anxiety": {
    "axis": "anxiety",
    "threshold": 64,
    "questions": [
      {
        "id": "ban1",
        "moduleId": "emotions",
        "scene": "Avant une situation importante…",
        "prompt": "Tu imagines surtout…",
        "options": [
          {
            "text": "Ce qui peut bien se passer.",
            "scores": {
              "anxiety": -1
            }
          },
          {
            "text": "Plusieurs possibilités.",
            "scores": {
              "anxiety": 1
            }
          },
          {
            "text": "Ce qui pourrait mal tourner.",
            "scores": {
              "anxiety": 2
            }
          },
          {
            "text": "Des scénarios très détaillés.",
            "scores": {
              "anxiety": 3
            }
          }
        ]
      }
    ]
  },
  "autism": {
    "axis": "autisticTraits",
    "threshold": 64,
    "questions": [
      {
        "id": "bt1",
        "moduleId": "neurodiversite",
        "scene": "Dans les interactions sociales…",
        "prompt": "Tu dois parfois réfléchir consciemment à ce qui est attendu ?",
        "options": [
          {
            "text": "Rarement.",
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
            "text": "Presque toujours.",
            "scores": {
              "autisticTraits": 3
            }
          }
        ]
      }
    ]
  }
};
