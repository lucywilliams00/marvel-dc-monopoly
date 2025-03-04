package main.marveldcmonopolyproject.models;

import main.marveldcmonopolyproject.models.collections.Collection;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "properties",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        })
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private Integer position;

    @NotBlank
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(	name = "property_collection",
            joinColumns = @JoinColumn(name = "property_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id"))
    private Collection collection;

    @NotBlank
    private Integer price;

    @NotBlank
    private Integer rent;

    @NotBlank
    private Integer rent1;

    @NotBlank
    private Integer rent2;

    @NotBlank
    private Integer rent3;

    @NotBlank
    private Integer rent4;

    @NotBlank
    private Integer rent5;

    @NotBlank
    private Integer mortgage;

    @NotBlank
    private String image_path;

    public Property() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Collection getCollection() {
        return collection;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getRent() {
        return rent;
    }

    public void setRent(Integer rent) {
        this.rent = rent;
    }

    public Integer getRent1() {
        return rent1;
    }

    public void setRent1(Integer rent1) {
        this.rent1 = rent1;
    }

    public Integer getRent2() {
        return rent2;
    }

    public void setRent2(Integer rent2) {
        this.rent2 = rent2;
    }

    public Integer getRent3() {
        return rent3;
    }

    public void setRent3(Integer rent3) {
        this.rent3 = rent3;
    }

    public Integer getRent4() {
        return rent4;
    }

    public void setRent4(Integer rent4) {
        this.rent4 = rent4;
    }

    public Integer getRent5() {
        return rent5;
    }

    public void setRent5(Integer rent5) {
        this.rent5 = rent5;
    }

    public Integer getMortgage() {
        return mortgage;
    }

    public void setMortgage(Integer mortgage) {
        this.mortgage = mortgage;
    }

    public String getImagePath() {
        return image_path;
    }

    public void setImagePath(String image_path) {
        this.image_path = image_path;
    }
}
