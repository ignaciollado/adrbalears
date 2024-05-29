export class SliderHomeDTO {
  slideId: number
  tagES: string
  tagCA: string
  projectNameES: string
  projectNameCA: string
  projectImg: string
  projectFase: string
  projectLema: string
  projectDestination: string
 constructor(
  slideId: number,
  tagES: string,
  tagCA: string,
  projectNameES: string,
  projectNameCA: string,
  projectImg: string,
  projectFase: string,
  projectLema: string,
  projectDestination: string,
  ) {
    this.slideId = slideId
    this.tagES = tagES
    this.tagCA = tagCA
    this.projectNameES = projectNameES
    this.projectNameCA = projectNameCA
    this.projectImg = projectImg
    this.projectFase = projectFase
    this.projectLema = projectLema
    this.projectDestination = projectDestination
    }
}
