export class SliderHomeDTO {
  slideId: number
  tagES: string
  tagCA: string
  projectNameES: string
  projectNameCA: string
  projectImg: string
  projectFase: string
  projectLema: string
  projectLemaCA: string
  projectDestination: string
  projectDestination_ca: string
 constructor(
  slideId: number,
  tagES: string,
  tagCA: string,
  projectNameES: string,
  projectNameCA: string,
  projectImg: string,
  projectFase: string,
  projectLema: string,
  projectLemaCA: string,
  projectDestination: string,
  projectDestination_ca: string,
  ) {
    this.slideId = slideId
    this.tagES = tagES
    this.tagCA = tagCA
    this.projectNameES = projectNameES
    this.projectNameCA = projectNameCA
    this.projectImg = projectImg
    this.projectFase = projectFase
    this.projectLema = projectLema
    this.projectLemaCA = projectLemaCA
    this.projectDestination = projectDestination
    this.projectDestination_ca = projectDestination_ca
    }
}
